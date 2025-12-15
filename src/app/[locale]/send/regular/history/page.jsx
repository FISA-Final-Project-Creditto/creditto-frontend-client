"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import HistoryCard from "./components/HistoryCard";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { credittoApi } from "@/src/app/api/axios";
import { useDispatch } from "react-redux";
import { setDetailData } from "@/src/store/features/sendHistory/sendHistorySlice";
import { useTranslations } from "next-intl";

export default function HistoryPage() {
  const [histories, setHistories] = useState([]); // 정기 송금 설정 목록 상태
  const [selectedAccount, setSelectedAccount] = useState(""); // 선택된 계좌 번호 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const t = useTranslations("send");

  const router = useRouter();
  const dispatch = useDispatch();

  // 계좌 가져오기
  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const accountsExist = await fetchAllAccounts(); // 계좌 조회

      if (accountsExist) {
        await fetchRemittanceHistory(); // 계좌 있으면 내역 조회
      } else {
        alert(t("regular.history.alert_no_linked_account"));
        router.push("/main");
      }
    };

    initialize();
  }, []);

  // 모든 계좌 조회
  const fetchAllAccounts = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const res = await credittoApi.get("/api/accounts/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { code, data } = res.data;
      if (code === 200 && data && data.length > 0) {
        console.log("모든 계좌 조회 성공:", data);
        setAllAccounts(data);
        setSelectedAccount(data[0].accountNo); // 첫 번째 계좌를 기본 선택
        return true; // 계좌 존재
      }

      return false; // 빈 배열 등도 계좌 없음 처리
    } catch (error) {
      console.error("모든 계좌 조회 중 오류 발생:", error);
      return false; // 오류 시에도 계좌 없음 취급
    }
  };

  // 정기 송금 설정 조회
  const fetchRemittanceHistory = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      setIsLoading(true);

      const res = await credittoApi.get("/api/remittance/scheduled", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { code, data } = res.data;

      if (code === 200) {
        console.log("정기송금 설정 내역:", data);
        setHistories(data);
        dispatch(setDetailData(data));
      }
    } catch (error) {
      console.log("정기송금 설정 내역 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // histories가 배열인지 계산
  const safeHistories = Array.isArray(histories) ? histories : [];

  // 선택된 계좌 번호에 따라 정기 송금 설정 목록 추출
  const filteredHistories =
    selectedAccount === ""
      ? safeHistories
      : safeHistories.filter(
          (item) => String(item.accountNo) === String(selectedAccount)
        );

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* 상단바 영역 */}
      <header>
        <AppHeader
          title={t("regular.history.title")}
          showBack={true}
          showHamburger={false}
        />
      </header>

      {/* 페이지 제목 및 계좌 선택 영역 */}
      <section className="flex flex-col gap-4 px-8">
        <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
          {t("regular.history.registered")}
        </h1>

        <div className="flex items-center justify-between mb-[2.813rem]">
          <div className="relative inline-block">
            {/* 연동된 계좌 선택 셀렉트 박스 */}
            <select
              className="flex items-center gap-2 px-2 py-1 bg-[#E5E6EB] rounded-sm text-sm font-medium text-black appearance-none pr-6 cursor-pointer"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">{t("common.selectAccount")}</option>
              {allAccounts.map((account) => (
                <option key={account.accountId} value={account.accountNo}>
                  {account.accountNo}
                </option>
              ))}
            </select>

            {/* 드롭다운 */}
            <ChevronDown className="w-4 h-4 text-black absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 정기 송금 설정 카드 목록 영역 */}
      <main className="space-y-[1.875rem] px-8">
        {isLoading && (
          <p className="text-sm text-[#86909C]">
            {t("regular.history.loading")}
          </p>
        )}

        {/* 계좌 선택 전에는 아무 것도 표시하지 않음 */}
        {!isLoading && selectedAccount === "" && (
          <p className="text-sm text-[#86909C] mt-4">
            {t("regular.history.selectAccountPrompt")}
          </p>
        )}

        {/* 계좌 선택 후, 필터링 결과가 없을 때 */}
        {!isLoading &&
          selectedAccount !== "" &&
          filteredHistories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-base font-medium text-[#4E5969]">
                {t("regular.history.noHistory")}
              </p>
              <p className="text-sm text-[#86909C] mt-1">
                {t("regular.history.noHistorySubtitle")}
              </p>
            </div>
          )}

        {/* 계좌 선택 후, 필터된 목록 표시 */}
        {!isLoading &&
          selectedAccount !== "" &&
          filteredHistories.length > 0 &&
          filteredHistories.map((history) => (
            <HistoryCard
              key={history.regRemId}
              history={history}
              onClick={() =>
                router.push(
                  `/send/regular/history/recurring/${history.regRemId}` +
                    `?recipientName=${encodeURIComponent(
                      history.recipientName
                    )}` +
                    `&accountNo=${encodeURIComponent(history.accountNo)}`
                )
              }
              onDeleteSuccess={(deleteId) => {
                setHistories((prev) =>
                  Array.isArray(prev)
                    ? prev.filter((item) => item.regRemId !== deleteId)
                    : []
                );
              }}
            />
          ))}
      </main>
    </div>
  );
}
