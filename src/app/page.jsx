"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  return (
 <main className="h-[100dvh] flex justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex flex-col justify-end bg-white ">
        <Image
          src="/접속로딩1.svg"
          alt="logo"
          fill
          className="object-fill "
        />

        <div className="relative z-10">
          <div className="w-full h-[73px] cursor-pointer flex justify-center items-center text-gray-300 underline text-lg font-medium"
          onClick={(e)=>{
            e.stopPropagation();
          router.push('/signup/permission')}}>
            회원가입
          </div>
          <button
            className="w-full h-[73px] bg-[#1A3668] text-white text-[26px] font-semibold flex justify-center items-center"
            onClick={() => router.push("/auth/pw")}>
            로그인
          </button>
        </div>
      </div>
    </main>
  );
}
