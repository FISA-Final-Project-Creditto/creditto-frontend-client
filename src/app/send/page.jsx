"use client";

import CardCarousel from "./components/CardCarousel";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SendBtn from "./components/SendBtn";
import BottomSheet from "./components/BottomSheet";

export default function SendMainPage() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 카드에서 선택된 송금 타입 id를 받는 콜백
  const handleSelectType = (id) => {
    if (id === "regular") {
      // 정기 해외 송금 선택 → 바텀시트 열기
      setIsSheetOpen(true);
    } else if (id === "one-time") {
      // 일회성 송금 로직 (예시)
      console.log("One-time transfer selected");
      // router.push("/transfer/one-time");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <AppHeader
        title="해외 송금"
        show={true}
        showHamburger={false}
        showBack={true}
      />

      <div className="flex-1 flex flex-col px-5 relative">
        {/* 타이틀 */}
        <div className="pt-8 pb-12">
          <h2 className="text-[1.625rem] font-bold text-black leading-tight text-balance">
            어떤 방식으로 <br />
            <span className="text-[#405881]">송금</span>하시겠어요?
          </h2>
          <p className="mt-2 text-[#86909C] text-sm leading-relaxed">
            원하시는 송금 방식을 선택해주세요
          </p>
        </div>

        {/* 카드 캐러셀 영역 */}
        <CardCarousel onSelectType={handleSelectType} />

        {/* 정기 해외 송금 선택 시 나오는 바텀시트 */}
        <BottomSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          title="정기 해외 송금 메뉴"
        >
          <div className="flex flex-col gap-2 mt-2">
            <SendBtn
              title="정기 해외 송금 신청"
              subtitle="원하는 날짜에 자동으로 송금해요"
              icon="plus"
              onClick={() => router.push("/send/choose")}
            />
            <SendBtn
              title="정기 해외 송금 내역 조회"
              subtitle="지난 송금 내역을 확인해요"
              icon="file"
              onClick={() => router.push("/send/history")}
            />
            <SendBtn
              title="정기 해외 송금 취소 · 변경"
              subtitle="등록된 정보를 수정하거나 취소해요"
              icon="setting"
              onClick={() => console.log("변경 클릭")}
            />
          </div>
        </BottomSheet>
      </div>
    </div>
  );
}
