"use client";
import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const router = useRouter();
  const t = useTranslations("send.regular.loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/send/regular/complete");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-[100dvh] flex justify-center items-center bg-[#e5e5e5] px-8">
      <main
        className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col items-start bg-white gap-20
      "
      >
        <h1 className="text-[1.375rem] text-left font-bold text-[#1A3668] mt-30 px-8">
          {t("title")}
        </h1>

        <div>
          <DotLottieReact
            src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
            loop
            autoplay
          />
        </div>
      </main>
    </div>
  );
}
