"use client";
import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations("auth.loading");
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/auth/success"), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    // min-h-dvh는 나중에 설정
    <main className="flex justify-center items-center py-20 bg-white">
      <div className="w-full max-w-[440px] mx-auto flex flex-col">
        <div className="flex flex-col items-center">
          <div className="w-full p-8 border">
            <p className="text-2xl font-semibold leading-relaxed text-black text-left">
              {t("title")}
            </p>
            <div className="text-lg font-normal text-[#4E5969] mb-[2.5rem] text-left">
              {t("description")}
            </div>
          </div>

          {/* Lottie 컨테이너 크기 고정 */}
          <div className="w-[200px] h-[200px] mt-6">
            <DotLottieReact
              src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }} // ← 이게 중요
            />
          </div>
        </div>
      </div>
    </main>
  );
}
