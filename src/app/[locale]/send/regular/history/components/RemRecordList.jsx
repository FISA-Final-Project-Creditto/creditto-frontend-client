"use client";

import { credittoApi } from "@/src/app/api/axios";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

// 정기 해외 송금 내역
export default function RemRecordList({
  regRemId,
  records = [],
  onRecordClick,
  sixMonthEndsMap = {}, // 6개월 완주 인덱스 정보 { [index]: cycleOrder }
}) {
  const [recurringHistory, setRecurringHistory] = useState(null);
  const t = useTranslations("send.regular.history");

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

  // 연도(year) 추출 함수
  const getYear = (dateStr) => {
    if (!dateStr) return "";
    const [year] = dateStr.split("-");
    return year;
  };

  if (!records.length) {
    return (
      <p className="text-sm text-[#86909C]">{t("no_remittance_history")}</p>
    );
  }

  return (
    <div className="space-y-5">
      {records.map((record, index) => {
        // 현재/이전 레코드의 연도 계산
        const currentYear = getYear(record.createdDate); // 현재 연도
        const prevYear =
          index > 0 ? getYear(records[index - 1].createdDate) : currentYear; // 이전 연도

        // 연도 변경 시 구분선 표시 여부
        const showYearDivider = index > 0 && currentYear !== prevYear;

        const cycleOrder = sixMonthEndsMap[index]; // 이 인덱스가 n번째 6개월 완주 지점인지

        return (
          <div key={record.remittanceId} className="space-y-2">
            {/* 연동 구분선 */}
            {showYearDivider && (
              <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-[#C9CDD4]" />
                <span className="text-sm text-[#86909C]">
                  {currentYear}
                  {t("year_unit")}
                </span>
                <div className="flex-1 border-t border-[#C9CDD4]" />
              </div>
            )}
            <article
              key={record.remittanceId}
              className="flex items-center justify-between py-2 rounded-lg cursor-pointer"
              onClick={async () => {
                onRecordClick && onRecordClick(record);
              }}
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
                    {formatAmount(record.sendAmount)} {t("krw_currency")}
                  </span>
                  <span className="text-sm text-[#86909C]">
                    {t("exchange_rate_label")}{" "}
                    {formatAmount(record.exchangeRate)}
                    {t("won_unit")}
                  </span>
                </div>
                <ChevronRight />
              </div>
            </article>

            {/* 6개월 정기 송금 구분선 */}
            {cycleOrder && (
              <div className="w-full mb-[0.5rem]">
                <div className="flex items-center gap-3">
                  <div className="flex-1 border-t border-[#E5E6EB]" />
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="text-xs text-[#86909C]">
                      {t("6month_cycle_completed_pt1")}
                      {cycleOrder}
                      {t("6month_cycle_completed_pt2")}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#2EA62E" }}
                    >
                      {t("credit_score_benefit")}
                    </span>
                  </div>
                  <div className="flex-1 border-t border-[#E5E6EB]" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
