"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import RegSendHistoryItem from "../components/RemRecordList";
import { useTranslations } from "next-intl";

// 정기적으로 송금 내역을 보여주는 페이지
export default function SendDetailPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { id } = params;
  const t = useTranslations("send.regular.history");

  const [dateRange, setDateRange] = useState("2025. 08.04 ~ 2025.11.04");
  const [remove, setRemove] = useState(false);

  const router = useRouter();

  // 정기 해외 송금 내역(Mock 데이터)
  const details = [
    {
      sendAmount: 1486098.0,
      exchangeRate: 1459.21,
      createdDate: "2025-11-25",
    },
    {
      sendAmount: 1488209.0,
      exchangeRate: 1461.29,
      createdDate: "2025-10-25",
    },
    {
      sendAmount: 1479419.0,
      exchangeRate: 1452.63,
      createdDate: "2025-09-25",
    },
    {
      sendAmount: 1485804.0,
      exchangeRate: 1458.92,
      createdDate: "2025-08-25",
    },
  ];

  const detail = details.find((h) => h.id === parseInt(id)); // 부모에게 전달받은 params(id)와 histories에서 동일한 id값을 가진 history 찾기

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* 상단바 */}
      <header>
        <Header />
      </header>

      {/* 정기 송금 내역 */}
      <section className="flex flex-col gap-4">
        <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
          {t("title")}
          {/* <span className="text-lg text-[#86909C]">({detail.recipient})</span> */}
        </h1>
      </section>

      {/* 정기 송금 내역 */}
      <main className="space-y-[1.875rem] mb-[2.813rem]">
        <RegSendHistoryItem />
      </main>

      {/* 정기 송금 완료 컴포넌트 */}
      <div className="flex items-center w-full gap-3">
        {/* 왼쪽 가로 라인 */}
        <div className="flex-1 border-t border-[#86909C]" />

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex flex-col items-end font-semibold">
          <span className="text-base text-black">{t("completed")}</span>
          <span className="text-right text-sm" style={{ color: "#2EA62E" }}>
            {t("creditScoreUp")}
          </span>
        </div>
      </div>
    </div>
  );
}
