"use client";

import { ChevronRight } from "lucide-react";

// 정기 해외 송금 내역
export default function RegSendHistoryItem({ details = [], onItemClick }) {
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

  if (!details.length) {
    return <p className="text-sm text-[#86909C]">아직 송금 내역이 없습니다.</p>;
  }

  return (
    <div className="space-y-5">
      {details.map((item, index) => (
        <article
          key={index}
          className="flex items-center justify-between py-2 rounded-lg"
          onClick={() => onItemClick && onItemClick(item)}
        >
          {/* 송금 날짜 */}
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#4E5969]">
              {formatDate(item.createdDate)}
            </span>
          </div>

          {/* 오른쪽: 송금 금액 */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold text-black">
                {formatAmount(item.sendAmount)} KRW
              </span>
              <span className="text-sm text-[#86909C]">
                환율 {formatAmount(item.exchangeRate)}원
              </span>
            </div>
            <ChevronRight />
          </div>
        </article>
      ))}
    </div>
  );
}
