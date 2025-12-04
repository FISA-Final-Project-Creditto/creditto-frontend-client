"use client";

import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetAccountStatus } from "@/src/store/features/account/accountSlice";
import BottomBar from "../../../send/components/BottomBar";
import { useTranslations } from "next-intl";

export default function AccountSuccessPage() {
  const t = useTranslations("account.success");
  const router = useRouter();
  const dispatch = useDispatch();

  // 성공 페이지에 진입 시 Redux 상태를 초기화하여 계좌 목록을 다시 불러오도록 함
  useEffect(() => {
    dispatch(resetAccountStatus());
  }, [dispatch]);
  return (
    <main className="h-[100dvh] flex justify-end items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col bg-white">
        <h1 className="text-[22px] font-semibold mt-17"></h1>
        <div className=" flex-1 px-10 pt-16 pb-10">
          <p className="text-2xl font-semibold leading-relaxed text-black text-left">
            {t("title")}
            <br />
            <span className="block text-lg font-normal text-[#86909C] mb-32">
              {t("description")}
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
            label={t("toMain")}
            onClick={() => {
              router.push("/account/my_account?refresh=true");
            }}
            isActive={true}
          />
        </footer>
      </div>
    </main>
  );
}
