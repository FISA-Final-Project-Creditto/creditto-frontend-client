"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { credittoApi } from "@/src/app/api/axios";

export default function Credit({ accountState ,historyScore}) {
  const router = useRouter();
  const goToCreditFirst = () => router.push("/credit/first");
  const maxScore = 950;
  const [creditInfo, setCreditInfo] = useState();
  const scorePercentage = creditInfo ? (creditInfo / maxScore) * 100 : 0;

  const getScoreDiff = (history) => {
    if (!history || history.length < 2) return 0;
    const last = Number(history[history.length - 1]?.avg_score ?? 0);
    const prev = Number(history[history.length - 2]?.avg_score ?? 0);
    return last - prev;
  };

  const renderCredit = () => {
    // 먼저 sessionStorage에 저장된 점수 확인 (새로고침 후에도 유지)
    const storedScore = sessionStorage.getItem("creditScoreValue");
    if (storedScore && Number(storedScore) >= 0) {
      return Number(storedScore);
    }
    
    // sessionStorage에 점수가 없으면
    if (!accountState || accountState.accountCount === 0)
      return (
        <button type="button" onClick={goToCreditFirst}>
          조회하기
        </button>
      );
    
    // accountCount > 0이고 API 호출 결과 확인
    if (creditInfo == null) return "...";
    return creditInfo;
  };

  const renderTier = () => {
    if (!accountState || accountState.accountCount === 0) return "신규";
    if (creditInfo == null) return "신규";
    // TODO: 등급 로직 필요 시 구현 (현재는 임시로 점수 반환)
    return creditInfo;
  };
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
            {renderCredit()}{" "}
            {accountState && accountState.accountCount > 0 && "점"}
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
          {(!accountState || accountState.accountCount === 0) ? (
            (() => {
              // sessionStorage에 저장된 점수가 있으면 그 이력 사용
              const storedScore = sessionStorage.getItem("creditScoreValue");
              if (storedScore && Number(storedScore) >= 0) {
                const storedHistory = sessionStorage.getItem("creditScoreHistory");
                const parsedHistory = storedHistory ? JSON.parse(storedHistory) : null;
                const diff = getScoreDiff(parsedHistory);
                const sign = diff > 0 ? "+" : "";
                const label = diff > 0 ? "상승" : diff < 0 ? "하락" : "변동없음";
                return `지난달 대비 ${diff !== 0 ? `${sign}${diff}점` : "0점"} ${label}`;
              }
              return <button type="button" onClick={goToCreditFirst}>조회하기</button>;
            })()
          ) : (
            (() => {
              const diff = getScoreDiff(historyScore);
              const sign = diff > 0 ? "+" : "";
              const label = diff > 0 ? "상승" : diff < 0 ? "하락" : "변동없음";
              return `지난달 대비 ${diff !== 0 ? `${sign}${diff}점` : "0점"} ${label}`;
            })()
          )}
        </p>
      </div>
    </div>
  );
}
