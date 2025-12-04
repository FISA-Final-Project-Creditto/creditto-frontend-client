"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomBar from "../components/BottomBar";
import Step from "./components/Step";
import { useTranslations } from "next-intl";
import AppHeader from "@/src/common/AppHeader/AppHeader";

const INITIAL_CHECKS = {
  term1: false,
  term2: false,
  term3: false,
  term4: false,
};

export default function AuthStepPage() {
  const t = useTranslations("auth.ocrStep");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(INITIAL_CHECKS);

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  // BottomSheet 닫힐 때 자동 초기화
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) setCheckedItems(INITIAL_CHECKS);
  };

  // 신분증 준비 알림 화면으로 이동
  const handleNavigation = () => {
    if (allChecked) {
      setOpen(false);
      router.push("/auth/ocr/identification");
    }
  };

  return (
    <main className="min-h-dvh bg-white flex flex-col items-start pt-[100px] px-8 pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      {/* 인증서 발급 안내 */}
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px]">
        {t("title")}
      </h1>

      {/* 단계 */}
      <section className="flex flex-col flex-1 gap-[1.875rem]">
        <Step title={t("step1Title")} subtitle={t("step1Subtitle")} />
        <Step title={t("step2Title")} subtitle={t("step2Subtitle")} />
      </section>

      {/* 하단 고정 버튼 */}
      <BottomBar
        label={t("issueCertificate")}
        onClick={() => router.push("/auth/ocr/consent")}
        isActive={true}
      />
    </main>
  );
}
