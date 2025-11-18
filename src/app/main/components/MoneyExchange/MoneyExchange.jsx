'use client'
import React from "react";
import RealTimeExchange from "./RealTimeExchange/RealTimeExchange";
import GoExchangeButton from "./GoExchangeButton/GoExchangeButton";
import { useRouter } from "next/navigation";

export default function MoneyExchange() {
  const router = useRouter();
  return (
    <div className="w-full h-[346px] bg-[#F3F6FB] flex flex-col justify-start items-center px-5">
      <div className="w-full h-[83px] font-bold text-xl text-[#2E5796] text-left flex items-center px-5">
        환전
      </div>
      <RealTimeExchange />
      <GoExchangeButton />
      <div className="w-full h-[78px]  flex justify-end  flex-col ">
        <div className="cursor-pointer bg-[#002057] flex justify-center items-center w-full h-[50px] text-[20px] text-white font-bold rounded-xl"
        onClick={()=>{router.push('/send')}}>해외 송금하러 가기</div>
      </div>
    </div>
  );
}
