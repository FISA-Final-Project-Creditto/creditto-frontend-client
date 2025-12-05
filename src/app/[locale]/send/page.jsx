"use client";

import CardCarousel from "./components/CardCarousel";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import { clearModeData } from "@/src/store/features/send/sendModeSlice";
import { credittoApi } from "../../api/axios";

export default function SendMainPage() {
  const t = useTranslations("send.common");
  const dispatch = useDispatch();
  const router = useRouter();
  const didFetch = useRef(false); // useEffect()가 2번 실행되는 걸 방지하기 위해 선언

  // 연동된 계좌가 있으면 송금 기능 사용 가능
  useEffect(() => {
    if (didFetch.current) return; // 두 번째 실행 차단
    didFetch.current = true;

    const fetchAccountBalance = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const res = await credittoApi.get("/api/accounts/me/balance", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.data.data.accountCount === 0) {
          alert("연동된 계좌가 없습니다");
          router.replace("/"); // 여기서 /main 으로 보내고 싶으면 "/main"으로 바꾸면 됨
        }
      } catch (error) {
        console.error("계좌 잔액 합산 조회 by UserId 오류 발생: ", error);
      }
    };

    fetchAccountBalance();
  }, []);

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
