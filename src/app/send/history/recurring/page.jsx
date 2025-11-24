"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Header from "../../../components/Header";
import HistoryCard from "../../components/HistoryCard";

// 정기적으로 송금 내역을 보여주는 페이지
export default function SendDetailPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { id } = params;

  const [dateRange, setDateRange] = useState("2025. 08.04 ~ 2025.11.04");
  const [remove, setRemove] = useState(false);

  const router = useRouter();

  // 정기 해외 송금 내역(Mock 데이터)
  const details = [
    {
      id: 1,
      schedule: "2025.10.10",
      sendCurrency: "100 USD",
      receiveCurrency: "147,000 KRW",
      recipient: "Richard Park",
      bank: "Bank Of America",
      country: "US",
    },
    {
      id: 2,
      schedule: "2025.09.10",
      sendCurrency: "100 USD",
      receiveCurrency: "147,000 KRW",
      recipient: "Richard Park",
      bank: "Bank Of America",
      country: "US",
    },
  ];

  const detail = details.find((h) => h.id === parseInt(id)); // 부모에게 전달받은 params(id)와 histories에서 동일한 id값을 가진 history 찾기

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* 상단바 */}
      <header>
        <Header />
      </header>

      {/* Content */}
      <section className="flex flex-col gap-4">
        <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
          정기 해외 송금 내역
          <span className="text-lg text-[#86909C]">({detail.recipient})</span>
        </h1>

        {/* 날짜 필터링 */}
        <div className="flex items-center justify-between mb-[2.813rem]">
          <button className="flex items-center gap-2 px-2 py-1 bg-[#E5E6EB] rounded-sm">
            <span className="text-sm font-medium text-black">{dateRange}</span>
            <ChevronDown className="w-4 h-4 text-black" />
          </button>
          <button
            className="text-sm font-semibold text-[#C9CDD4]"
            onClick={() => setRemove(!remove)}
          >
            {remove ? "완료" : "삭제하기"}
          </button>
        </div>
      </section>

      {/* 특정 송금인에게 보낸 해외 송금 내역 */}
      <main className="space-y-[1.875rem] mb-[2.813rem]">
        {details.map((detail) => (
          <HistoryCard
            key={detail.id}
            history={detail}
            removeState={remove}
            onClick={() =>
              router.push(`/send/history/historyDetail/${detail.id}/sendDetail`)
            }
          />
        ))}
      </main>

      {/* 정기 송금 완료 컴포넌트 */}
      <div className="flex items-center w-full gap-3">
        {/* 왼쪽 가로 라인 */}
        <div className="flex-1 border-t border-[#86909C]" />

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex flex-col items-end font-semibold">
          <span className="text-base text-black">6개월 정기 송금 완료</span>
          <span className="text-right text-sm" style={{ color: "#2EA62E" }}>
            신용도 점수 +50
          </span>
        </div>
      </div>
    </div>
  );
}
