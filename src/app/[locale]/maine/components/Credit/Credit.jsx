"use client";

import React, { useEffect, useState } from "react";
import { credittoApi } from "@/src/app/api/axios";

export default function Credit({ accountState }) {
  const creditScore = 750;
  const maxScore = 900;
  const [creditInfo, setCreditInfo] = useState();
const scorePercentage = creditInfo ? (creditInfo / maxScore) * 100 : 0;

  const renderCredit = () =>{
    if (accountState.accountCount === 0) {
      return "조회하기";
    }
    // API 로딩 중이거나 점수가 없을 때 '...' 표시
    return creditInfo || '0';
  };
  const renderTier=()=>{
      if (accountState.accountCount === 0) {
      return "신규";
    }
    return creditInfo || '신규';
  
  }
  useEffect(() => {
    const fetchCreditScore = async () => {
      try {
        // console.log(accountState.accountCount)
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        if (!accessToken) return;

        const res = await credittoApi.get(`/api/credit-score/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        
  
        setCreditInfo(res.data.credit_score);
        // setHistoryScore(r);
        console.log("신용점수 크레디토 : ", res.data);
      } catch (error) {
        console.error("신용점수 조회 실패:", error);
      }
    };
    fetchCreditScore();
  }, [accountState.accountCount]);

  return (
    <div className="w-full mt-5 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl p-6 text-primary-foreground shadow-lg ">
      <div className="flex justify-between items-start mb-5 text-left">
        <div>
          <p className="text-xs font-medium opacity-80 mb-1">Creditto 점수</p>
          <h3 className="text-3xl font-bold">
            {renderCredit()} {accountState && accountState.accountCount > 0 && '점'}
          </h3>
          <p className="text-xs opacity-70 mt-1">최고 {maxScore}점</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-80 text-center mb-2">등급</p>
          <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
            {renderTier()}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs opacity-80">신용도 평가</span>
          <span className="text-xs font-medium">
            {Math.round(scorePercentage)}%
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2.5">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
        <p className="text-xs opacity-75 mt-2">
          지난달 대비{" "}
          {creditInfo >= 0 ? `+${creditInfo}` : creditInfo}
          점 {creditInfo >= 0 ? "상승" : "하락"}
        </p>
      </div>
    </div>
  );
}
