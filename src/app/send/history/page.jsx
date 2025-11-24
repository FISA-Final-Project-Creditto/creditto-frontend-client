"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import HistoryCard from "./components/HistoryCard";
import Header from "../components/Header";

export default function RecurringPage() {
  const [dateRange, setDateRange] = useState("2025. 08.04 ~ 2025.11.04");
  const [choose, setChoose] = useState(false);
  const router = useRouter();

  // 정기 해외 송금 내역(Mock 데이터)
  const histories = [
    {
      id: 1,
      schedule: "매월 10일",
      sendCurrency: "100 USD",
      receiveCurrency: "147,000 KRW",
      recipient: "Richard Park",
      bank: "Bank Of America",
      country: "US",
    },
    {
      id: 2,
      schedule: "매월 10일",
      sendCurrency: "100 USD",
      receiveCurrency: "147,000 KRW",
      recipient: "Richard Park",
      bank: "Bank Of America",
      country: "US",
    },
    {
      id: 3,
      schedule: "매월 10일",
      sendCurrency: "100 USD",
      receiveCurrency: "147,000 KRW",
      recipient: "Richard Park",
      bank: "Bank Of America",
      country: "US",
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-white px-5">
      {/* 상단바 */}
      <header>
        <Header />
      </header>

      {/* Content */}
      <section className="flex flex-col gap-4">
        <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
          정기 해외 송금 내역
        </h1>

        {/* 날짜 필터링 */}
        <div className="flex items-center justify-between mb-[2.813rem]">
          <button className="flex items-center gap-2 px-2 py-1 bg-[#E5E6EB] rounded-sm">
            <span className="text-sm font-medium text-black">{dateRange}</span>
            <ChevronDown className="w-4 h-4 text-black" />
          </button>
          <button
            className="text-sm font-semibold text-[#4D6389]"
            onClick={() => setChoose(!choose)}
          >
            {choose ? "선택완료" : "선택"}
          </button>
        </div>
      </section>

      {/* 해외 송금 전체 내역 */}
      <main className="space-y-[1.875rem]">
        {histories.map((history) => (
          <HistoryCard
            key={history.id}
            history={history}
            chooseState={choose}
            onChangeChooseState={setChoose}
            onClick={() => router.push(`/send/history/${history.id}`)}
          />
        ))}
      </main>
    </div>
  );
}
1;
