"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RealTimeExchange() {
  const [usd, setUsd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const date = `${yyyy}${mm}${dd}`;

    fetch(`/api/exchange?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        const usdData = data.find((item) => item.cur_unit === "USD");
        setUsd(usdData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("환율 데이터 조회 실패:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-[90%] h-[46px] bg-white rounded-xl text-left flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🇺🇸</span>
        <span className="text-gray-600 font-medium">
          실시간 환율 ({usd?.cur_nm || "USD"})
        </span>
      </div>
      <div className="font-bold text-gray-800">
        <span>
          {isLoading
            ? "..."
            : usd?.tts
            ? new Intl.NumberFormat("ko-KR").format(
                Number(usd.tts.replace(/,/g, ""))
              )
            : "..."}
        </span>
        <span className="text-gray-500 font-normal ml-1">원</span>
      </div>
    </div>
  );
}
