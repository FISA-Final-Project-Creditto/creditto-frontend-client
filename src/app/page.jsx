"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  return (
    <>
      <Image src="/접속로딩1.svg" alt="logo" fill className="w-full h-[50%]" />

      <div className="relative z-10">
        <div
          className="w-full h-[90px] cursor-pointer flex justify-center items-center text-gray9000 underline text-lg "
          onClick={(e) => {
            // 이벤트 버블링
            e.stopPropagation();
            router.push("/signup/permission");
          }}
        >
          회원가입
        </div>
        <div
          className="cursor-pointer w-full absolute h-[90px] bg-[#190668] text-white text-[26px] font-medium flex justify-center items-center"
          onClick={() => router.push("/main")}
        >
          {/* 임시 라우터임  */}
          로그인
        </div>
      </div>
    </>
  );
}
