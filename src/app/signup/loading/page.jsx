"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signup/success");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-[100dvh] flex justify-center items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col bg-white">
        <h1 className="text-[22px] font-semibold text-gray-900 mt-17"></h1>
        <div className="flex-1 px-8 mt-5 ">
          <p className="text-2xl font-semibold leading-relaxed text-gray-900 text-left">
            고객님의 정보를 확인하고 있어요
            <br />
            <p className="text-lg font-normal text-gray-500 mb-5">
              잠시만 기다려 주세요
            </p>
          </p>
          <div>
            <DotLottieReact
              src="https://lottie.host/5e3d00b3-79ca-4abd-9808-99013190e330/8EXayNOkme.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </main>
  );
}
