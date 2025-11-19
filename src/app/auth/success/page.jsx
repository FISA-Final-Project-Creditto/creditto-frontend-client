"use client";

import Image from "next/image";
import BottomBar from "../ocr/components/BottomBar";

export default function SuccessPage() {
  return (
    <div className="min-h-dvh bg-white flex flex-col pt-[100px] pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px] leading-tight">
        인증서가 발급되었어요
      </h1>

      <h2 className="text-[#4E5969] mb-[35px]">
        이제부터 모든 서비스를 이용할 수 있어요
      </h2>

      {/* 이미지 */}
      <Image
        src="/issuance.png"
        alt="신분증 예시"
        width={300}
        height={200}
        className="mx-auto"
      />

      <BottomBar label="시작하기" isActive={true} />
    </div>
  );
}
