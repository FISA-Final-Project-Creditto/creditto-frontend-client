"use client";
import React, { useEffect, useState } from "react";
import MoneyExchange from "./components/MoneyExchange/MoneyExchange";
import Header from "./components/Header/Header";
import RoundedIconTabs from "./components/Tabs";
import FunctionButton from "./components/FunctionButton/FunctionButton";
import Money from "../maine/components/Money/Money";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
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
    const fetchBalance = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          router.replace("/");
          return;
        }
        const response = await credittoApi.get("/api/accounts/me/balance", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // API 응답에서 balance와 accountCount를 모두 상태로 저장
        setAccountState({
          balance: response.data.data.totalBalance,
          accountCount: response.data.data.accountCount,
        });
        console.log("반응 : ", response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccountState({ balance: null, accountCount: 0 }); // 에러 발생 시 초기화
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };
    fetchBalance();
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
