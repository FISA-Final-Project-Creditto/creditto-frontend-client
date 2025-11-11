"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  return (
    <main className="h-[100dvh] flex justify-end items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col bg-white">
        <h1 className="text-[22px] font-semibold text-gray-900 mt-17"></h1>
        <div className="flex-1 px-8 mt-5 ">
          <p className="text-2xl font-semibold leading-relaxed text-gray-900 text-left">
            가입이 완료되었어요
            <br />
            <span className="block text-lg font-normal text-gray-500 mb-10">
              creditto의 서비스를 이용하기 위해서 
              <br/>
              인증서 발급이 필요해요
            </span>
          </p>
          <div>
            <DotLottieReact
              src="https://lottie.host/5c64549d-d983-4d34-bc50-680299f731ce/EO1GXl7zwp.lottie"
              loop
              autoplay
            />
          </div>
        </div>
               <button
            className="w-full h-[73px] bg-[#1A3668] text-white text-[26px] font-semibold flex justify-center items-center"
            onClick={() => router.push("/auth/pw")}>
            인증서 발급하기
          </button>
      </div>
    </main>
  );
}
