"use client";

import { ChevronRight } from "lucide-react";

// 정기 해외 송금 내역
export default function RemRecordList({ records = [], onRecordClick }) {
  // 날짜 포맷터: "2025-11-25" → "11.25"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [_, month, day] = dateStr.split("-");
    return `${month}.${day}`;
  };

  // 금액 포맷터: 1486098 → "1,486,098"
  const formatAmount = (amount) => {
    if (amount == null) return "";
    return Number(amount).toLocaleString();
  };

  if (!records.length) {
    return <p className="text-sm text-[#86909C]">아직 송금 내역이 없습니다.</p>;
  }

  return (
    <div className="space-y-5">
      {records.map((record) => (
        <article
          key={record.remittanceId}
          className="flex items-center justify-between py-2 rounded-lg"
          onClick={() => onRecordClick && onRecordClick(record)}
        >
          {/* 송금 날짜 */}
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#4E5969]">
              {formatDate(record.createdDate)}
            </span>
          </div>

          {/* 오른쪽: 송금 금액 */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold text-black">
                {formatAmount(record.sendAmount)} KRW
              </span>
              <span className="text-sm text-[#86909C]">
                환율 {formatAmount(record.exchangeRate)}원
              </span>
            </div>
            <ChevronRight />
          </div>
        </article>
      ))}
    </div>
  );
}
