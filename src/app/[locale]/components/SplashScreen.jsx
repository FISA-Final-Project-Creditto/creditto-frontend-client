"use client";

import { requireVerification } from "@/src/store/features/simplepw/simplepwSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SplashScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations();

  //   const [isClient, setIsClient] = useState(false);

  // hydration 이후에만 클라이언트로 인식됨
  //   useEffect(() => {
  //     const setClient = () => {
  //       setIsClient(true);
  //     };

  //     setClient();
  //   }, []);

  useEffect(() => {
    if (!isClient) return; // sessionStorage는 클라이언트 환경에서만 접근

    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      router.replace("/main"); // 뒤로가기 시 다시 로그인 페이지로 오지 않도록 replace 사용
    }
  }, [router]);

  const handleLogin = () => {
    // if (!isClient) return;

    router.push("/select-lang?next=/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex-grow">
        <Image
          src="/접속로딩1.svg"
          alt="logo"
          fill
          style={{ objectFit: "contain" }}
          loading="eager"
        />
      </div>

      <div className="flex-shrink-0">
        <div
          className="w-full h-[60px] cursor-pointer flex justify-center items-center text-gray-500 underline text-base"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/select-lang?next=/signup/permission");
          }}
        >
          {t("signUp")}
        </div>

        <div
          className="cursor-pointer w-full h-[90px] bg-[#1A3668] text-white text-[22px] font-medium flex justify-center items-center"
          onClick={handleLogin}
        >
          {t("logIn")}
        </div>
      </div>
    </div>
  );
}
