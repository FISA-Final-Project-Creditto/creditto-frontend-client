"use client";
import { credittoApi } from "@/src/app/api/axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Money({ accountState, isLoading }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const t = useTranslations("maine");

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const renderBalance = () => {
    if (isLoading) {
      return t("money.loading");
    }

    // B. 예전에 썼는데 지금은 계좌 끊음 (onboarding=true, accountCount=0)
    if (accountState.accountCount === 0) {
      return t("money.noAccount");
    }

    // C, D. 계좌 연동했고, 잔액이 0원이거나 그 이상
    // balance가 null인 경우는 API 에러로 간주하여 다른 메시지를 보여줄 수도 있습니다.
    if (accountState.balance === null) {
      return t("money.cantLoad");
    }

    const formattedBalance = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(accountState.balance);

    if (isBalanceVisible) {
      return formattedBalance;
    } else {
      return "●●●●●";
    }
  };

  return (
    <div className="w-full bg-card border bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 border-border rounded-t-2xl h-14 flex items-center shadow justify-between px-5">
      <div className="flex items-center gap-3">
        <p className="text-base text-white font-medium">{t("money.balance")}</p>
        <h4 className="text-base font-normal text-white">{renderBalance()}</h4>
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
