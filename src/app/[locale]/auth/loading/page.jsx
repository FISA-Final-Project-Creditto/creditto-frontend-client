"use client";

import RedirectAfterDelay from "./RedirectAfterDelay";
import LottieClient from "./LottieClient";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations("auth.loading");

  return (
    <main className="flex justify-center items-center py-20 bg-white">
      <RedirectAfterDelay />
      <div className="w-full max-w-[440px] mx-auto flex flex-col">
        <div className="flex flex-col items-center">
          <div className="w-full p-8">
            <p className="text-2xl font-semibold leading-relaxed text-black text-left">
              {t("title")}
            </p>

            <div className="text-lg font-normal text-[#4E5969] mb-[2.5rem] text-left">
              {t("description")}
            </div>
          </div>

          {/* Lottie dynamic + fallback skeleton */}
          <LottieClient />
        </div>
      </div>
    </main>
  );
}
