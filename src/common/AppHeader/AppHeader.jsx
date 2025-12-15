"use client";
import Hambuger from "@/src/app/[locale]/main/components/Hambuger";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

export default function AppHeader({
  title,
  showBack = true,
  show = true,
  showHamburger = true,
  onBackClick, // 특정 뒤로가기로 이동하고 싶을 때 실행하는 함수

  // 수정 관련
  showEdit = false,
  edit,
  handleEdit,
}) {
  const t = useTranslations("send");

  const router = useRouter();
  if (!show) return null;

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white ">
      <div className="w-9 h-10 flex items-center">
        {showBack && (
          <ChevronLeft
            className="w-15 h-15 cursor-pointer"
            onClick={handleBack}
          />
        )}
      </div>

      <h1 className="text-lg font-semibold ">{title}</h1>

      <div className="w-9 h-10 flex items-center justify-end">
        {showHamburger && <Hambuger />}
        {showEdit && !edit && (
          <button
            onClick={handleEdit}
            className="text-sm font-semibold text-[#4D6389]"
          >
            {t("common.header.edit_button")}
          </button>
        )}
      </div>
    </header>
  );
}
