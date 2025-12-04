"use client";

import Image from "next/image";
import BottomBar from "../ocr/components/BottomBar";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SuccessPage() {
  const t = useTranslations("auth.authSuccess");
  const router = useRouter();
  return (
    <div className="min-h-dvh bg-white flex flex-col pt-[100px] pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px] leading-tight">
        {t("title")}
      </h1>

      <h2 className="text-[#4E5969] mb-[35px]">{t("description")}</h2>

      {/* 이미지 */}
      <Image
        src="/issuance.png"
        alt={t("idCardExample")}
        width={300}
        height={200}
        className="mx-auto"
      />

      <BottomBar
        label={t("start")}
        onClick={() => {
          router.push("/");
        }}
        isActive={true}
      />
    </div>
  );
}
