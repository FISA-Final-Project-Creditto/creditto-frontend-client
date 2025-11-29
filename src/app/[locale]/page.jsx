"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginMode } from "@/src/store/features/simplepw/simplepwSlice";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function SplashPage({ hasSerial }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      router.replace("/main"); // 뒤로가기 시 다시 로그인 페이지로 오지 않도록 replace 사용
    }
  }, [router]);

  const handleLogin = () => {
    if (!hasSerial) {
      router.push("/login");
    } else {
      dispatch(loginMode());
      router.push("/auth/pw");
    }
  };

  return (
    <>
      <Image src="/접속로딩1.svg" alt="logo" fill className="w-full h-[50%]" />

      <div className="relative z-10">
        <div
          className="w-full h-[90px] cursor-pointer flex justify-center items-center text-gray9000 underline text-lg"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/signup/permission");
          }}
        >
          {t("signUp")}
        </div>

        <div
          className="cursor-pointer w-full absolute h-[90px] bg-[#190668] text-white text-[26px] font-medium flex justify-center items-center"
          onClick={handleLogin}
        >
          {t("logIn")}
        </div>
      </div>
    </>
  );
}
