"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// 송금 거래 내역 상세 조회
export default function RecurringHistory({ record, onClose }) {
  const t = useTranslations("send.common");
  const tRecurring = useTranslations("send.regular.history");
  // ,(쉼표)를 3자리로 끊어서 설정
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "";
    return Number(num).toLocaleString();
  };

  if (!record) return null; // record가 없으면 아무것도 렌더링하지 않음

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-4">
        {tRecurring("detail_title")}
      </h2>

      <div className="space-y-4 pt-2">
        <div className="border border-[#E5E6EB] bg-[#F7F8FA] rounded-xl p-4 text-center">
          <p className="text-sm text-[#C9CDD4] mb-1">
            {tRecurring("transaction_amount_label")}
          </p>
          <p className="text-3xl font-bold text-[#1A3668]">
            {formatNumber(record.sendAmount)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">
              {tRecurring("balance_label")}
            </span>
            <span className="font-semibold">{record.accountNo}</span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">
              {tRecurring("total_fee_label")}
            </span>
            <span className="font-semibold">
              {formatNumber(record.totalFee)}
            </span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">
              {tRecurring("recipient_bank_name_label")}
            </span>
            <span className="font-semibold">{record.recipientBankName}</span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">
              {tRecurring("recipient_account_number_label")}
            </span>
            <span className="font-semibold">{record.recipientAccountNo}</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-[#86909C]">
              {tRecurring("remittance_status_label")}
            </span>
            <span className="font-semibold text-[#00B42A]">
              {record.remittanceStatus}
            </span>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-[#1A3668] text-white py-3 text-lg font-semibold mt-2"
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
}
