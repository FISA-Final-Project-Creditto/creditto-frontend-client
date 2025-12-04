import { useTranslations } from "next-intl";
import React from "react";

export default function GoExchangeButton() {
  const t = useTranslations("main.goExchangeButton");
  return (
    <div className="w-full h-[122px]  flex justify-end items-center flex-col">
      <div className="w-[90%] h-[100px] bg-white rounded-xl flex justify-between items-center flex-row pl-[1.5rem] pr-[1.5rem]">
        <div>
          <h2 className="text-[18px] font-bold text-black leading-tight text-left">
            {t("title")}
          </h2>
          <p className="font-medium text-[14px] text-gray-500 mt-1 text-left">
            {t("subtitle")}
          </p>
        </div>
        <div>
          <img src="/icon/exchange.png" className="w-[82px] h-full" />
        </div>
      </div>
    </div>
  );
}
