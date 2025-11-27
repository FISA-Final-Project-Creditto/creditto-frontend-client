"use client";

import CardCarousel from "./components/CardCarousel";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SendMainPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <AppHeader
        title="해외 송금 · 조회"
        show={true}
        showHamburger={false}
        showBack={true}
      />

      <div className="flex-1 flex flex-col px-5 relative">
        {/* 타이틀 */}
        <div className="pt-8 pb-12">
          <h2 className="text-[1.625rem] font-bold text-black leading-tight text-balance">
            어떤 <span className="text-[#405881]">해외 송금</span>이<br />
            필요하신가요?
          </h2>
          <p className="mt-2 text-[#86909C] text-sm leading-relaxed">
            송금 신청부터 내역 관리까지 가능해요
          </p>
        </div>

        {/* 카드 캐러셀 영역 */}
        <CardCarousel />
      </div>
    </div>
  );
}
