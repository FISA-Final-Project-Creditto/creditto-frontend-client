"use client";
import { credittoApi } from "@/src/app/api/axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Money({}) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [money, setMoney] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) return;
        const response = await credittoApi.get("/api/accounts/me/balance", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // API 응답 구조에 맞게 잔액을 추출하세요. 예: response.data.balance
        setMoney(response.data.data); 
        console.log("반응 : ", response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setMoney(null); // 에러 발생 시 잔액 null로 설정
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };
    fetchBalance();
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };


  const renderBalance = () => {
    if (isLoading) {
      return "잔액 조회 중..."; // A, B (로딩 중)
    }
    if (money === null) {
      return "계좌 연결 후 조회 가능"; // A, B (계좌 없음 또는 에러)
    }

    const formattedBalance = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(money);

    if (isBalanceVisible) {
      return formattedBalance; // C, D
    } else {
      return "●●●●●"; // C, D (숨김 처리)
    }
  };

  return (
    <div className="w-full bg-card border bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 border-border rounded-t-2xl h-14 flex items-center shadow justify-between px-5">
      <div className="flex items-center gap-3">
        <p className="text-base text-white font-medium">계좌잔액</p>
        <h4 className="text-base font-normal text-white">{renderBalance()}</h4>
      </div>
      <button
        onClick={toggleBalanceVisibility}
        className="p-1.5 hover:bg-white/10 rounded-lg transition text-white"
      >
        {isBalanceVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
