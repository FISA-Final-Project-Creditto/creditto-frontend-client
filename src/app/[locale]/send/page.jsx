"use client";

import CardCarousel from "./components/CardCarousel";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import { clearModeData } from "@/src/store/features/send/sendModeSlice";

export default function SendMainPage() {
  const t = useTranslations("send.common");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // 약관 ID 리스트 아이디 초기화
    const consentIds = [4, 5, 6];

    // 각 약관의 체크 상태를 false로 초기화
    consentIds.forEach((id) => {
      dispatch(
        setConsentChecked({
          id: String(id),
          checked: false, // 체크 해제
        })
      );
    });

    // 송금 모드 관련 Redux 상태 초기화 (예: sendModeSlice)
    dispatch(clearModeData());
  }, [dispatch]); // 컴포넌트 최초 렌더링 시 1회 실행

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <AppHeader
        title={t("pageTitle")}
        show={true}
        showHamburger={false}
        showBack={true}
        onBackClick={() => router.replace("/main")} // 메인페이지로 이동하는 건 replace로
      />

      <div className="flex-1 flex flex-col px-5 relative">
        {/* 타이틀 */}
        <div className="pt-8 pb-12">
          <h2 className="text-[1.625rem] font-bold text-black leading-tight text-balance whitespace-pre-line">
            <span className="text-[#405881]">{t("pageSubtitle")}</span>
          </h2>
          <p className="mt-2 text-[#86909C] text-sm leading-relaxed">
            {t("pageDescription")}
          </p>
        </div>

        {/* 카드 캐러셀 영역 */}
        <CardCarousel />
      </div>
    </div>
  );
}
