"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomBar from "../components/BottomBar";
import BottomSheet from "../components/BottomSheet";
import Step from "./components/Step";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

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
    <main className="min-h-dvh bg-white flex flex-col items-start pt-[100px] pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      {/* 인증서 발급 안내 */}
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px]">
        {t("title")}
      </h1>

      {/* 단계 */}
      <section className="flex flex-col gap-[1.875rem]">
        <Step title={t("step1Title")} subtitle={t("step1Subtitle")} />
        <Step
          title={t("step2Title")}
          subtitle={t("step2Subtitle")}
        />
      </section>

      {/* 하단 고정 버튼 */}
      <BottomBar
        label={t("issueCertificate")}
        onClick={() => setOpen(true)}
        isActive={true}
      />

      {/* 바텀시트 */}
      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <p className="text-[18px] text-[#4E5969] mb-[35px]">
          {t("dialogDescription")}
        </p>

        {/* 체크 버튼 리스트 */}
        <div className="flex flex-col gap-[10px] mb-[20px]">
          {[
            { key: "term1", text: t("terms1") },
            { key: "term2", text: t("terms2") },
            {
              key: "term3",
              text: t("terms3"),
            },
            { key: "term4", text: t("terms4") },
          ].map(({ key, text }) => (
            <button
              key={key}
              onClick={() => toggleCheck(key)}
              className="flex items-center gap-[10px] text-left"
            >
              <Check
                size={20}
                color={checkedItems[key] ? "#1A3668" : "#E5E6EB"}
              />
              <p className="text-[#4E5969] text-sm">{text}</p>
            </button>
          ))}
        </div>

        {/* 버튼 */}
        <button
          disabled={!allChecked}
          onClick={handleNavigation}
          className={`
            w-full h-[40px] rounded-[10px] text-white text-[1.125rem] font-semibold 
            active:opacity-90 transition-colors mt-[4rem] mb-[0.938rem]
            ${allChecked ? "bg-[#1A3668]" : "bg-[#99A6BC] cursor-not-allowed"}
          `}
        >
          {t("issueCertificate")}
        </button>

        {/* 다음에 발급하기 */}
        {/* ✅ TODO: 로그인 창으로 이동 */}
        <center>
          <button className="text-[#86909C] text-[14px]">
            {t("issueLater")}
          </button>
        </center>
      </BottomSheet>
    </main>
  );
}
