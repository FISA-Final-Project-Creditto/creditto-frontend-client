"use client";
import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/auth/success"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="pt-[100px] flex justify-center items-center">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col bg-white">
        <div className="flex-1  mt-5 ">
          <p className="text-2xl font-semibold leading-relaxed text-[#000000]">
            고객님의 정보를 확인하고 있어요
          </p>
          <div className="text-lg font-normal text-[#4E5969] mb-[6.25rem]">
            잠시만 기다려 주세요
          </div>

          <DotLottieReact
            src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
            loop
            autoplay
            className="w-fit"
          />
        </div>
      </div>
    </main>
  );
}
