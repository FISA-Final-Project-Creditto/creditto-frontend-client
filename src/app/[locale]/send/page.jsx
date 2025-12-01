"use client";

import CardCarousel from "./components/CardCarousel";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function SendMainPage() {
  const t = useTranslations("send.common");
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <AppHeader
        title={t("pageTitle")}
        show={true}
        showHamburger={false}
        showBack={true}
      />

      <div className="flex-1 flex flex-col px-5 relative">
        {/* 타이틀 */}
        <div className="pt-8 pb-12">
          <h2 className="text-[1.625rem] font-bold text-black leading-tight text-balance whitespace-pre-line">
            <span className="text-[#405881]">{t("pageSubtitle")}</span>
          </h2>
          <p className="mt-2 text-[#86909C] text-sm leading-relaxed">
            {t("pageDescription")}
          </p>
        </div>

        {/* 카드 캐러셀 영역 */}
        <CardCarousel />
      </div>
    </div>
  );
}
