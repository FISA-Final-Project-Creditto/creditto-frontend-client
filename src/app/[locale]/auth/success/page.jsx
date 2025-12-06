"use client";

import Image from "next/image";
import BottomBar from "../ocr/components/BottomBar";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CertificateCard from "./components/CertifcateCard";
import { useSelector } from "react-redux";
import { selectClientData } from "@/src/store/features/send/sendSelectors";
import { useEffect } from "react";

// 1년 뒤 계산(2월 29일 → 2월 28일로 설정)
const addOneYearSafely = (date) => {
  const year = date.getFullYear() + 1;
  const month = date.getMonth();
  const day = date.getDate();

  const lastDay = new Date(year, month + 1, 0).getDate();
  const safeDay = Math.min(day, lastDay);

  return new Date(year, month, safeDay);
};

// YYYY.MM.DD 포맷
const formatDateToDot = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
};

export default function SuccessPage() {
  const t = useTranslations("auth.authSuccess");
  const router = useRouter();

  const userName = useSelector((state) => state.user.name); // 등록된 이름

  // 오늘 기준 1년 뒤 날짜
  const expiryDate = formatDateToDot(addOneYearSafely(new Date()));

  return (
    <main className="px-8 flex flex-col justify-center items-start py-20">
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[5px] leading-tight text-center">
        {t("title")}
      </h1>

      <h2 className="text-[#4E5969] mb-[35px] text-center">
        {t("description")}
      </h2>

      {/* 이미지 */}
      <CertificateCard name={userName} expiryDate={expiryDate} />

      <BottomBar
        label={t("start")}
        onClick={() => {
          router.push("/");
        }}
        isActive={true}
      />
    </main>
  );
}
