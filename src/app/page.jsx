"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginMode } from "../store/features/simplepw/simplepwSlice";
import { useEffect, useState } from "react";
import axios from "axios"; // 지금은 안 쓰고 있지만 남겨둠 (필요 없으면 지워도 됨)

// 쿠키에서 특정 이름의 값을 꺼내오는 헬퍼 함수
function getCookie(name) {
  if (typeof document === "undefined") return null; // SSR 안전장치

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return value ? decodeURIComponent(value.split("=")[1]) : null;
}

export default function SplashPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [hasSerial, setHasSerial] = useState(false);

  useEffect(() => {
    const serialNumber = getCookie("serialNumber");

    console.log("쿠키에서 읽은 serialNumber:", serialNumber);
    setHasSerial(!!serialNumber); // Boolean으로 정리해서 저장
  }, []);

  const handleLogin = () => {
    if (!hasSerial) {
      alert("인증서가 없습니다");
      router.push("/signup/permission");
    } else {
      dispatch(loginMode(true)); // reducer에서 payload 안 쓰고 있으면 그냥 loginMode()만 해도 됨
      router.push("/auth/pw");
    }
  };

  return (
    <>
      <Image src="/접속로딩1.svg" alt="logo" fill className="w-full h-[50%]" />

      <div className="relative z-10">
        <div
          className="w-full h-[90px] cursor-pointer flex justify-center items-center text-gray9000 underline text-lg "
          onClick={(e) => {
            // 이벤트 버블링 방지
            e.stopPropagation();
            router.push("/signup/permission");
          }}
        >
          회원가입
        </div>
        <div
          className="cursor-pointer w-full absolute h-[90px] bg-[#190668] text-white text-[26px] font-medium flex justify-center items-center"
          onClick={handleLogin}
        >
          로그인
        </div>
      </div>
    </>
  );
}
