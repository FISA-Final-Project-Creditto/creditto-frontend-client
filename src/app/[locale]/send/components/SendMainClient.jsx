"use client";

import { credittoApi } from "@/src/app/api/axios";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import { clearModeData } from "@/src/store/features/send/sendModeSlice";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CardCarousel from "./CardCarousel";

export default function SendMainClient() {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("send.common");
  const didFetch = useRef(false);

  // 계좌 조회
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    async function fetchAccountBalance() {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const res = await credittoApi.get("/api/accounts/me/balance", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.data.data.accountCount === 0) {
          alert("연동된 계좌가 없습니다");
          router.replace("/");
        }
      } catch (error) {
        console.error("계좌 잔액 합산 조회 오류:", error);
      }
    }

    fetchAccountBalance();
  }, [router]);

  // 약관 체크 초기화
  useEffect(() => {
    [4, 5, 6].forEach((id) => {
      dispatch(
        setConsentChecked({
          id: String(id),
          checked: false,
        })
      );
    });

    dispatch(clearModeData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader
        title={t("pageTitle")}
        showHamburger={false}
        showBack={true}
        onBackClick={() => router.replace("/main")}
      />

      <main className="flex-1 flex flex-col px-5 relative">
        <section className="pt-8 pb-12">
          <h2 className="text-[1.625rem] font-bold leading-tight text-black whitespace-pre-line">
            <span className="text-[#405881]">{t("pageSubtitle")}</span>
          </h2>
          <p className="mt-2 text-[#86909C] text-sm leading-relaxed rounded-md px-1">
            {t("pageDescription")}
          </p>
        </section>

        <CardCarousel />
      </main>
    </div>
  );
}
