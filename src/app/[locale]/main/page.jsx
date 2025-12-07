"use client";
import React, { useEffect, useState } from "react";
import MoneyExchange from "./components/MoneyExchange/MoneyExchange";
import Header from "./components/Header/Header";
import RoundedIconTabs from "./components/Tabs";
import FunctionButton from "./components/FunctionButton/FunctionButton";
import Money from "../maine/components/Money/Money";
import { useRouter } from "next/navigation";
import { credittoApi } from "../../api/axios";
import { useTranslations } from "next-intl";

export default function MainPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("main");

  const [accountState, setAccountState] = useState({
    balance: null,
    accountCount: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          router.replace("/");
          return;
        }

        const headers = { Authorization: `Bearer ${accessToken}` };

        // 두 API를 동시에 호출합니다.
        const [balanceResponse, accountsResponse] = await Promise.all([
          credittoApi.get("/api/accounts/me/balance", { headers }),
          credittoApi.get("/api/accounts/me", { headers }),
        ]);

        // 잔액 정보 처리
        if (balanceResponse.data && balanceResponse.data.data) {
          setAccountState({
            balance: balanceResponse.data.data.totalBalance,
            accountCount: balanceResponse.data.data.accountCount,
          });
          console.log("잔액 정보 응답 : ", balanceResponse.data);
        }

        // 계좌 목록 정보 처리
        if (accountsResponse.data && accountsResponse.data.data) {
          // 계좌 목록 전체를 JSON 문자열로 변환하여 sessionStorage에 저장합니다.
          sessionStorage.setItem(
            "accounts",
            JSON.stringify(accountsResponse.data.data)
          );
          console.log("계좌 목록 저장 성공", accountsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccountState({ balance: null, accountCount: 0 }); // 에러 발생 시 초기화
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="">
        <div className="px-5 mt-2">
          <Money accountState={accountState} isLoading={isLoading} />
          <RoundedIconTabs accountState={accountState} />
          <FunctionButton />
        </div>
        <div className="px-5 mt-5 ">
          <div></div>
        </div>

        <div className="w-full flex-1 bg-[#F3F6FB] flex overflow-auto rounded-3xl">
          <MoneyExchange />
        </div>
      </main>
    </>
  );
}
