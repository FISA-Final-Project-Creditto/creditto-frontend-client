"use client";
import React from "react";
import RealTimeExchange from "./RealTimeExchange/RealTimeExchange";
import GoExchangeButton from "./GoExchangeButton/GoExchangeButton";
import GradientSparkleButton from "@/src/app/[locale]/maine/components/Send/SendButton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function MoneyExchange() {
  const router = useRouter();
  const t = useTranslations("main.moneyExchange");
  return (
    <div className="w-full h-[346px] bg-[#F3F6FB] flex flex-col justify-start items-center">
      <div className="w-full h-[83px] font-bold text-[26px] text-[#2E5796] text-left flex items-center px-7 ">
        {t("title")}
      </div>
      <RealTimeExchange />
      <GoExchangeButton />
      <div className="w-full h-[50px]  flex justify-center items-center flex flex-col mt-5 px-5">
        {/* <div className="bg-[#002057] flex justify-center items-center w-full h-[50px] text-[20px] text-white font-bold rounded-xl">환전 신청하러 가기</div> */}
        <GradientSparkleButton
          onClick={() => {
            router.push("/send");
          }}
        />
      </div>
    </div>
  );
}
