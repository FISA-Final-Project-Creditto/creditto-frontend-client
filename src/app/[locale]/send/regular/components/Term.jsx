"use client";

import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Term({ content }) {
  const t = useTranslations("send.common");
  return (
    <section className="flex flex-col items-start mb-6 gap-[0.938rem]">
      <div className="flex items-center gap-[5px]">
        <Info className="w-5 h-5 text-[#4E5969]" />
        <h4 className="text-lg font-bold text-[#4E5969]">{t("notice")}</h4>
      </div>
      <p className="text-xs text-[#86909C] text-left leading-relaxed">
        {t("noticeContent")}
      </p>
    </section>
  );
}
