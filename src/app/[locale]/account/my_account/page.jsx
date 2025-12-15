"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import React from "react";
import ImportAccount from "./components/ImportAccount/ImportAccount";
import { useTranslations } from "next-intl";
import BottomBar from "../../send/components/BottomBar";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
  const t = useTranslations("account.myAccount");
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen">
      {/* 상단 헤더 */}
      <AppHeader
        title={t("title")}
        show={true}
        showBack={true}
        showHamburger={false}
        onBackClick={() => router.replace("/main")}
      />

      {/* 콘텐츠 영역 */}
      <div className="flex-1">
        <ImportAccount />
      </div>

      {/* 하단 바 */}
      <BottomBar
        label={t("goToCreate")}
        onClick={() => router.push("/account/create")}
        isActive={true}
      />
    </main>
  );
}
