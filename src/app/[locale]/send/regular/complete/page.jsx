"use client";

import Header from "../components/Header";
import Image from "next/image";
import CreditScoreBanner from "./components/CreditPointBanner";
import BottomBar from "../../components/BottomBar";
import Term from "../components/Term";
import { useRouter } from "next/navigation";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { credittoApi } from "@/src/app/api/axios";

export default function CompletePage() {
  const router = useRouter();
  const t = useTranslations("send");

  const [creditScore, setCreditScore] = useState(0); // 신용점수

  // 브라우저 뒤로가기
  useEffect(() => {
    const handlePopState = (event) => {
      router.replace("/send");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  useEffect(() => {
    // 최신 신용점수 조회
    const fetchRecentScore = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        const res = await credittoApi.post(`/api/credit-score/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = res.data;

        if (data) {
          setCreditScore(data.credit_score); // 최신 신용점수 업데이트
        }
      } catch (error) {
        console.error("최신 신용점수 조회 중 오류 발생: ", error);
      }
    };

    fetchRecentScore();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header>
        <AppHeader
          title={t("common.remittance")}
          show={true}
          showHamburger={false}
          showBack={true}
          onBackClick={() => router.push("/send")}
        />
      </header>
      <div className="px-5">
        <section className="flex flex-col gap-[2.188rem]">
          <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
            {t("components.complete.title")}
          </h1>

          {/* 우리은행 벌 캐릭터 */}
          <center>
            <Image
              src="/creditto.png"
              alt="Woori Bee"
              width={180}
              height={200}
            />
          </center>

          <p className="text-left text-xl font-bold text-black">
            {t("components.complete.currentScore")}{" "}
            <span className="font-bold text-[#1A3668]">{creditScore}</span>
            {t("components.creditPointBanner.point")}
          </p>

          {/* 신용도 점수 배너 */}
          <section className="flex flex-col gap-4">
            <CreditScoreBanner
              label={t("components.complete.months12")}
              point="767"
            />
            <CreditScoreBanner
              label={t("components.complete.months18")}
              point="777"
            />
            <CreditScoreBanner
              label={t("components.complete.months24")}
              point="787"
            />
          </section>

          {/* 약관 동의 */}
          <Term />
        </section>
      </div>
      {/* 하단 버튼 */}
      <footer>
        <BottomBar
          label={t("components.complete.complete")}
          onClick={() => router.push("/send")}
          isActive={true}
        />
      </footer>
    </div>
  );
}
