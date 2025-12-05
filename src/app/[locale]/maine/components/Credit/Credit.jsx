"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { credittoApi } from "@/src/app/api/axios";

export default function Credit({ historyScore }) {
  const userId = sessionStorage.getItem("userId");
  const router = useRouter();
  const goToCreditFirst = () => router.push("/credit/first");
  const maxScore = 950;

  const [score, setScore] = useState(null); // 0도 유효한 점수일 수 있으므로 null로 초기화
  const scorePercentage = score !== null ? (score / maxScore) * 100 : 0;

  useEffect(() => {
    // userId가 있을 경우 localStorage에서 캐시된 점수를 확인합니다.
    if (userId) {
      const cachedScore = localStorage.getItem(`creditScore_${userId}`);
      // localStorage에 값이 존재하면(빈 문자열이 아니면) 점수 상태를 업데이트합니다. '0'도 유효한 값입니다.
      if (cachedScore !== null) {
        setScore(Number(cachedScore));
      }
    }
    // 캐시된 점수가 없으면 status는 'loading'으로 유지되어 '조회하기' 버튼이 보입니다.
    // TODO: 실제 API를 호출하여 점수를 가져오는 로직을 여기에 추가할 수 있습니다.
  }, [userId]);

  const getScoreDiff = (history) => {
    if (!history || history.length < 2) return 0;
    const last = Number(history[history.length - 1]?.avg_score ?? 0);
    const prev = Number(history[history.length - 2]?.avg_score ?? 0);
    return last - prev;
  };

  const renderTier = () => {
    // TODO: 점수에 따른 등급 로직 구현 필요
    if (score === null) return "신규";
    return score; // 현재는 임시로 점수 표시
  };

  // 점수 변동 텍스트를 생성하는 로직을 변수로 추출
  const scoreDiffText = React.useMemo(() => {
    const diff = getScoreDiff(historyScore);
    const sign = diff > 0 ? "+" : "";
    const label = diff > 0 ? "상승" : diff < 0 ? "하락" : "변동없음";
    return `지난달 대비 ${sign}${diff}점 ${label}`;
  }, [historyScore]);

  return (
    <div className="w-full mt-5 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl p-6 text-primary-foreground shadow-lg ">
      <div className="flex justify-between items-start mb-5 text-left">
        <div>
          <p className="text-xs font-medium opacity-80 mb-1">Creditto 점수</p>
          <h3 className="text-3xl font-bold">
            {score === null ? (
              <button type="button" onClick={goToCreditFirst}>
                조회하기
              </button>
            ) : (
              <>
                {score} <span className="text-2xl">점</span>
              </>
            )}
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

      {/* Progress bar 및 점수 변동 정보 */}
      <div className="">
        {score !== null && (
          <>
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
              />
            </div>

            {scoreDiffText && (
              <p className="text-xs opacity-75 mt-2">{scoreDiffText}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
