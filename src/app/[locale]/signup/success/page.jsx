"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import BottomBar from "../../send/components/BottomBar";
import { useTranslations } from "next-intl";

export default function SuccessPage() {
  const t = useTranslations("signup.success");
  const router = useRouter();
  return (
    <main className="h-[100dvh] flex justify-end items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col bg-white">
        <h1 className="text-[22px] font-semibold text-gray-900 mt-17"></h1>
        <div className=" flex-1 px-10 pt-16 pb-10">
          <p className="text-2xl font-semibold leading-relaxed text-gray-900 text-left">
            {t("title")}
            <br />
            <span className="block text-lg font-normal text-gray-500 mb-32 whitespace-pre-line">
              {t("description")}
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
        <div className="w-full  h-[118px]  flex justify-center items-end">
          <div
            className="cursor-pointer w-[90%] h-[60px] text-sm font-semibold flex justify-center items-center  text-[#86909C]   underline"
            onClick={(e) => {
              // 이벤트 버블링
              e.stopPropagation();
              router.push("/");
            }}
          >
            {" "}
            {t("doItLater")}
          </div>
        </div>
        <footer>
          <BottomBar
            label="인증서 발급하기"
            onClick={() => {
              router.push("/auth/ocr/ocr-step");
            }}
            isActive={true}
          />
        </footer>
      </div>
    </main>
  );
}
