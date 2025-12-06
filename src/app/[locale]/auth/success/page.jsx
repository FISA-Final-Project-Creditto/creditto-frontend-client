"use client";

import Image from "next/image";
import BottomBar from "../ocr/components/BottomBar";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SuccessPage() {
  const t = useTranslations("auth.authSuccess");
  const router = useRouter();
  return (
    <main className="px-8 flex flex-col justify-center items-ceanter min-h-dvh">
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[5px] leading-tight text-center">
        {t("title")}
      </h1>

      <h2 className="text-[#4E5969] mb-[35px] text-center">
        {t("description")}
      </h2>

      {/* 이미지 */}
      <Image
        src="/creditto.png"
        alt={t("idCardExample")}
        width={150}
        height={150}
        className="mx-auto"
      />

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
