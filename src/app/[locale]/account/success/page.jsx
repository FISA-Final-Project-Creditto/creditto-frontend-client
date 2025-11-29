"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import BottomBar from "../../send/components/BottomBar";

export default function AccountSuccessPage() {
  const router = useRouter();
  return (
    <main className="h-[100dvh] flex justify-end items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col bg-white">
        <h1 className="text-[22px] font-semibold text-gray-900 mt-17"></h1>
        <div className=" flex-1 px-10 pt-16 pb-10">
          <p className="text-2xl font-semibold leading-relaxed text-gray-900 text-left">
            계좌가 생성되었어요 !
            <br />
            <span className="block text-lg font-normal text-gray-500 mb-32">
              이제 Creditto의 생활을 시작해 보세요
            </span>
          </p>
          <div>
            <DotLottieReact
              src="https://lottie.host/2e4e1311-14a0-432f-a5c8-6c0207d8d93a/OWH3nKX1g0.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        <footer>
          <BottomBar
            label="메인 화면으로"
            onClick={() => {
              router.push("/main");
            }}
            isActive={true}
          />
        </footer>
      </div>
    </main>
  );
}
