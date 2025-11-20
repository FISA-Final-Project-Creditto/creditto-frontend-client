"use client";

import Header from "./components/Header";
import CardCarousel from "./components/CardCarousel";
import SendBtn from "./components/SendBtn";
import { useRouter } from "next/navigation";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function SendPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
       <AppHeader
              title="해외 송금"
              show={true}
              showHamburger={false}
              showBack={true}
            />

      <div className="flex-1 flex flex-col px-5">
        {/* 타이틀 */}
        <div className="pt-8 pb-12">
          <h2 className="text-[26px] font-bold text-black text-center leading-relaxed">
            <span className="text-[#405881]">정기 해외 송금</span> 등록하고
            <br />
            신용도도 높이고
          </h2>
        </div>

        {/* Carousel (커버플로우 곡선 효과) */}
        <CardCarousel />

        {/* Action Buttons */}
        <div className="pb-8 space-y-4">
          <SendBtn
            title="정기 해외 송금 신청"
            onClick={() => router.push("/send/choose")}
          />
          <SendBtn
            title="정기 해외 송금 내역 조회"
            onClick={() => router.push("/send/history")}
          />
          <SendBtn title="정기 해외 송금 취소⋅변경" />
        </div>
      </div>
    </div>
  );
}
