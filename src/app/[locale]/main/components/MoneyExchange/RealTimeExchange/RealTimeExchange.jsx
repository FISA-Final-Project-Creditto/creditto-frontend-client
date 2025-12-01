'use client'
import { credittoApi } from "@/src/app/api/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState , } from "react";

export default function RealTimeExchange() {
  const [exchange, setExchange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) return;

        const response = await credittoApi.get("/api/exchange/USD", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setExchange(response.data.data);
      } catch (error) {
        console.error("환율 정보 조회 실패:", error);
        // 주기적인 호출이 실패할 경우, 이전 값을 유지하거나 에러 상태를 표시할 수 있습니다.
      } finally {
        // 첫 로딩 시에만 isLoading 상태를 변경합니다.
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };
        // 1. 컴포넌트 마운트 시 즉시 한 번 호출
    fetchExchangeRate();

    // 2. 1초마다 주기적으로 API 호출 설정
    const intervalId = setInterval(fetchExchangeRate, 1000);

    // 3. 컴포넌트 언마운트 시 interval 정리 (메모리 누수 방지)
    return () => clearInterval(intervalId);
  }, [isLoading]); // isLoading을 의존성 배열에 추가하여 finally 블록이 여러 번 실행되지 않도록 함

 

  return (
    <div className="w-[90%] h-[46px] bg-white rounded-xl text-left flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🇺🇸</span>
        <span className="text-gray-600 font-medium">실시간 환율 ({exchange?.currencyCode || 'USD'})</span>
      </div>
      <div className="font-bold text-gray-800">
        <span>{exchange ? new Intl.NumberFormat('ko-KR').format(exchange.exchangeRate) : '...'}</span>
        <span className="text-gray-500 font-normal ml-1">원</span>
      </div>
    </div>
  );

}
