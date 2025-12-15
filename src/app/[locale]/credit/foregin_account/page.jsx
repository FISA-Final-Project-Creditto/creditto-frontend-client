'use client'
import AppHeader from "@/src/common/AppHeader/AppHeader";
import React from "react";
import { useRouter } from "next/navigation";
import PassportCountryGrid from "./components/PassportCountryGrid";
import { useTranslations } from "next-intl";

export default function ForeginPage() {
  const router = useRouter();
  const t = useTranslations("creditForeginAccount");

  const handleSelect = (country) => {
    // 선택 시 현재 페이지 쿼리에 선택된 국가 코드 추가 (shallow push)
    router.push(`?country=${country.code}`);
  };
  return (
   <main className="px-8">
        <AppHeader
          title={t("title")}
          showHamburger={false}
          showBack={true}
          show={true}
        />
        <div className="mt-8 text-xl font-bold text-left ml-5 h-20">
          <span>{t("question")}</span>
        </div>

        <div className="mt-2">
          <PassportCountryGrid onSelect={handleSelect} />
        </div>
  </main>
  );
}
