import { useTranslations } from "next-intl";
import React from "react";

export default function RealTimeExchange() {
  const t = useTranslations("main.realTimeExchange");
  return (
    <div className="w-[90%] h-[46px] bg-white rounded-xl text-left flex items-center pl-[1.5rem]">
      {t("exchangeRateAPI")}
    </div>
  );
}
