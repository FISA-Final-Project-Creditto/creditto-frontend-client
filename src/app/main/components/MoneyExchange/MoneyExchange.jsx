import React from "react";
import RealTimeExchange from "./RealTimeExchange/RealTimeExchange";
import GoExchangeButton from "./GoExchangeButton/GoExchangeButton";

export default function MoneyExchange() {
  return (
    <div className="w-full h-[346px] bg-[#F3F6FB] flex flex-col justify-start items-center px-5">
      <div className="w-full h-[83px] font-bold text-[26px] text-[#2E5796] text-left flex items-center px-5">
        환전
      </div>
      <RealTimeExchange />
      <GoExchangeButton />
      <div className="w-full h-[78px]  flex justify-end  flex-col">
        <div className="bg-[#002057] flex justify-center items-center w-full h-[50px] text-[20px] text-white font-bold rounded-xl">환전 신청하러 가기</div>
      </div>
    </div>
  );
}
