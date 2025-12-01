"use client";

import { Button } from "@/components/ui/button";
import { credittoApi } from "@/src/app/api/axios";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const remittanceData = {
  accountNo: "1002444079921", // 계좌번호
  totalFee: 26888.0, // 수수료
  sendAmount: 1486098.0, // 송금 금액
  recipientBankName: "Bank of America", // 수취 은행명
  recipientAccountNo: "3333059825555", // 수취 계좌번호
  remittanceStatus: "REQUESTED", // 송금 상태
};

export default function RecurringHistory({ regRemId, remittanceId, onClose }) {
  const [remittanceData, setRemittanceData] = useState({});
  const t = useTranslations("send.regular.history");

  // ,(쉼표)를 3자리로 끊어서 설정
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "";
    return Number(num).toLocaleString();
  };

  // 정기 해외 송금 기록의 내역 상세 조회 API 요청
  useEffect(() => {
    const fetchRemittanceDetail = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const res = await credittoApi.get(
          `/api/remittance/scheduled/history/${regRemId}/${remittanceId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.code === 200 && res.data) {
          console.log(
            "정기 해외 송금 기록의 내역 상세 조회 응답 성공: ",
            res.data
          );
          setDetails(res.data.data); // 상세 정보들 저장
        }
      } catch (error) {
        console.log("정기 해외 송금 기록의 내역 상세 조회 응답 실패: ", error);
      }
    };
  });
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-4">
        {t("recurringDetailTitle")}
      </h2>

      <div className="space-y-4 pt-2">
        <div className="border border-[#E5E6EB] bg-[#F7F8FA] rounded-xl p-4 text-center">
          <p className="text-sm text-[#C9CDD4] mb-1">{t("remittanceAmount")}</p>
          <p className="text-3xl font-bold text-[#1A3668]">
            {formatNumber(remittanceData.sendAmount)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">
              {t("remittanceAccountNumber")}
            </span>
            <span className="font-semibold">{remittanceData.accountNo}</span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">{t("fee")}</span>
            <span className="font-semibold">
              {formatNumber(remittanceData.totalFee)}
            </span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">{t("recipientBankName")}</span>
            <span className="font-semibold">
              {remittanceData.recipientBankName}
            </span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">{t("recipientAccountNumber")}</span>
            <span className="font-semibold">
              {remittanceData.recipientAccountNo}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-[#86909C]">{t("status")}</span>
            <span className="font-semibold text-[#00B42A]">
              {remittanceData.remittanceStatus}
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
