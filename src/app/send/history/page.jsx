"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import HistoryCard from "./components/HistoryCard";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import credittoApi from "../../api/axios";

export default function HistoryPage() {
  const [choose, setChoose] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  console.log("accessToken: ", accessToken);

  // ✅ 계좌 연동해서 보여주기
  // ✅ 아마도 sessionStorage에서 꺼내와서 쓰는 거 같음
  const [selectedAccount, setSelectedAccount] = useState("");
  const accounts = ["1002-123-123124", "1002-346-346234"];

  // 실제 송금 리스트를 담는 곳
  const [histories, setHistories] = useState([]);

  const router = useRouter();

  // 로딩 / 에러 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지 접속 시 최초 1회 API 조회
  useEffect(() => {
    const fetchRemittanceHistory = async () => {
      try {
        setIsLoading(true);
        const res = await credittoApi.get("/api/remittance/scheduled", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.data.code === 200) {
          setHistories(res.data.data);
        }
      } catch (error) {
        console.log("사용자 정기송금 설정 내역 조회 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemittanceHistory();
  }, [accessToken]); // 빈 배열 → 페이지 렌더 시 1회 실행

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* 상단바 */}
      <header>
        <AppHeader
          title="정기 송금 내역"
          showBack={true}
          showHamburger={false}
        />
      </header>

      {/* Content */}
      <section className="flex flex-col gap-4 px-8">
        <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
          등록된 정기 송금
        </h1>

        <div className="flex items-center justify-between mb-[2.813rem]">
          <div className="relative inline-block">
            {/* 연동된 계좌 선택 */}
            <select
              className="flex items-center gap-2 px-2 py-1 bg-[#E5E6EB] rounded-sm text-sm font-medium text-black appearance-none pr-6 cursor-pointer"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">계좌를 선택하세요</option>
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>

            {/* 기존처럼 오른쪽에 아이콘 겹치기 */}
            <ChevronDown className="w-4 h-4 text-black absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 해외 송금 전체 내역(계좌 선택 시 보여짐) */}
      {selectedAccount && (
        <main className="space-y-[1.875rem] px-8">
          {histories.map((history) => (
            <HistoryCard
              key={history.regRemId}
              history={history}
              chooseState={choose}
              onChangeChooseState={setChoose}
              onClick={() =>
                router.push(
                  `/send/history/details/${history.regRemId}` +
                    `?recipientName=${encodeURIComponent(
                      history.recipientName
                    )}` +
                    `&accountNo=${encodeURIComponent(history.accountNo)}`
                )
              }
            />
          ))}
        </main>
      )}
    </div>
  );
}
1;
