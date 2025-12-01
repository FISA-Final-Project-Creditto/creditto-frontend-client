"use client";

import { Button } from "@/components/ui/button";
import { credittoApi } from "@/src/app/api/axios";
import { useEffect, useState } from "react";

export default function RecurringHistory({ regRemId, remittanceId, onClose }) {
  const [remittanceData, setRemittanceData] = useState(null);

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

        const { code, data } = res.data;
        if (code === 200) {
          console.log("정기 해외 송금 기록의 내역 상세 조회 응답 성공");
          setRemittanceData(data); // 상세 정보 저장
        }
      } catch (error) {
        console.error(
          "정기 해외 송금 기록의 내역 상세 조회 응답 실패: ",
          error
        );
      }
    };
  });
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-4">송금 상세 정보</h2>

      <div className="space-y-4 pt-2">
        <div className="border border-[#E5E6EB] bg-[#F7F8FA] rounded-xl p-4 text-center">
          <p className="text-sm text-[#C9CDD4] mb-1">송금 금액</p>
          <p className="text-3xl font-bold text-[#1A3668]">
            {formatNumber(remittanceData.sendAmount)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">송금 계좌 번호</span>
            <span className="font-semibold">{remittanceData.accountNo}</span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">수수료</span>
            <span className="font-semibold">
              {formatNumber(remittanceData.totalFee)}
            </span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">수취 은행 이름</span>
            <span className="font-semibold">
              {remittanceData.recipientBankName}
            </span>
          </div>

          <div className="flex justify-between py-3 ">
            <span className="text-[#86909C]">수취 계좌 번호</span>
            <span className="font-semibold">
              {remittanceData.recipientAccountNo}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-[#86909C]">송금 처리 상태</span>
            <span className="font-semibold text-[#00B42A]">
              {remittanceData.remittanceStatus}
            </span>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-[#1A3668] text-white py-3 text-lg font-semibold mt-2"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
