"use client";
import React, { useEffect } from "react";
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
    <>

      <h1 className="text-[22px] font-semibold text-gray-900 mt-17"></h1>
      <div className="flex-1 px-3 mt-5 ">
        <p className="text-2xl font-semibold leading-relaxed text-gray-900 text-left">
          고객님의 정보를 확인하고 있어요
          <br />
          <p className="text-lg font-normal text-gray-500 mb-32">
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
    </>
  );
}
