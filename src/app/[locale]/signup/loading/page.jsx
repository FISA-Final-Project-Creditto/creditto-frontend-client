"use client";
import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations("signup.loading");
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/signup/success");
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-white">
      <div className="w-full max-w-[440px] px-8">
        {/* 제목 영역 */}
        <h1 className="text-2xl font-semibold leading-relaxed text-gray-900 text-center">
          고객님의 정보를 확인하고 있어요
        </h1>
        <p className="text-lg font-normal text-gray-500 mb-16 text-center">
          잠시만 기다려 주세요
        </p>

        {/* Lottie 영역 - 크기 고정 */}
        <div className="w-[200px] h-[200px] mx-auto">
          <DotLottieReact
            src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }} // 🔴 이 부분 중요
          />
        </div>
      </div>
    </main>
  );
}
