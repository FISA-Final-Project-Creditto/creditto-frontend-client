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
          <div className="w-full h-[90px] cursor-pointer flex justify-center items-center text-gray9000 underline text-lg "
          onClick={(e)=>{
            // 이벤트 버블링 
            e.stopPropagation();
          router.push('/signup/permission')}}>
            회원가입
          </div>
          <div
            className="cursor-pointer w-full h-[90px] bg-[#190668] text-white text-[26px] font-medium flex justify-center items-center"
            onClick={() => router.push("/main")}>
              {/* 임시 라우터임  */}
            로그인
          </div>
        </div>
      </div>
    </main>
  );
}
