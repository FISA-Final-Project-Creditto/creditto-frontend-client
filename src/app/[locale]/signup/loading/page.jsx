"use client";
import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations("signup.loading");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signup/success");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <h1 className="text-[22px] font-semibold text-gray-900 mt-17"></h1>
      <div className="flex-1 px-8 mt-5">
        <h2 className="text-2xl font-semibold leading-relaxed text-gray-900 text-left mb-32">
          {t("title")}
          <br />
          <span className="text-lg font-normal text-gray-500">
            {t("description")}
          </span>
        </h2>
        <div>
          <DotLottieReact
            src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }} // 🔴 이 부분 중요
          />
        </div>
      </div>
    </>
  );
}
