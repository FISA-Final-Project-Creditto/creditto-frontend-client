import RedirectAfterDelay from "./RedirectAfterDelay";
import LottieClient from "./LottieClient";
import { getTranslations } from "next-intl/server";

export default async function LoadingPage() {
  // const t = await getTranslations("auth.loading");

  return (
    <main className="flex justify-center items-center py-20 bg-white">
      <RedirectAfterDelay />
      <div className="w-full max-w-[440px] mx-auto flex flex-col">
        <div className="flex flex-col items-center">
          <div className="w-full p-8">
            <p className="text-2xl font-semibold leading-relaxed text-black text-left">
              정보를 확인 중입니다
            </p>

            <div className="text-lg font-normal text-[#4E5969] mb-[2.5rem] text-left">
              잠시만 기다려주세요
            </div>
          </div>

          {/* Lottie dynamic + fallback skeleton */}
          <LottieClient />
        </div>
      </div>
    </main>
  );
}
