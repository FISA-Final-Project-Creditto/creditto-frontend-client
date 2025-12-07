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
import { useSelector } from "react-redux";

export default function CompletePage() {
  const router = useRouter();
  const t = useTranslations("send");

  const [creditScore, setCreditScore] = useState(null); // 최신 신용 점수
  const [hasCreditHistory, setHasCreditHistory] = useState(false); // 신용 점수 조회 이력 여부

  const [sixScore, setSixScore] = useState(null); // 6개월 예측
  const [twelveScore, setTwelveScore] = useState(null); // 12개월 예측
  const [eighteenScore, setEighteenScore] = useState(null); // 18개월 예측

  const monthly_amount = useSelector((state) => state.send.sendAmount); // 월 정기 송금액

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
    const fetchRecentScore = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        if (!accessToken || !userId) {
          console.error("인증 정보가 없어 신용점수를 조회할 수 없습니다.");
          setHasCreditHistory(false);
          return;
        }

        const res = await credittoApi.get(`/api/credit-score/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // 응답 구조: { credit_score: 773 }
        const score = res.data?.credit_score;

        if (score != null) {
          setHasCreditHistory(true); // 조회 이력 있음
          setCreditScore(score); // 최신 신용 점수 저장
          console.log("신용 점수 응답: ", score);
        } else {
          // score가 없으면 조회 이력 없다고 간주
          setHasCreditHistory(false);
          setCreditScore(null);
        }
      } catch (error) {
        console.error("최신 신용점수 조회 중 오류 발생: ", error);
        setHasCreditHistory(false);
        setCreditScore(null);
      }
    };

    fetchRecentScore();
  }, []);

  // 예측 신용도 점수
  useEffect(() => {
    const predictCreditScore = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        if (!accessToken || !userId) return;
        if (!hasCreditHistory || creditScore === null) return;

        const res = await credittoApi.post(
          `/api/credit-score/prediction`,
          {
            user_id: userId,
            monthly_amount: monthly_amount,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // 응답 그대로 사용 (code, data 래퍼 없음)
        const prediction = res.data;

        if (!prediction) return;

        console.log("예측 신용 점수 조회 성공: ", prediction);

        setSixScore(prediction.after_6m?.score ?? null);
        setTwelveScore(prediction.after_12m?.score ?? null);
        setEighteenScore(prediction.after_18m?.score ?? null);
      } catch (error) {
        console.error("예측 신용 점수 조회 중 오류 발생: ", error);
      }
    };

    if (hasCreditHistory) {
      predictCreditScore();
    }
  }, [hasCreditHistory, creditScore, monthly_amount]);

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header>
        <AppHeader
          title={t("common.remittance")}
          show={true}
          showHamburger={false}
          showBack={true}
          onBackClick={() => router.replace("/send")}
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
              alt="크레디토 캐릭터"
              width={180}
              height={200}
            />
          </center>

          {/* 신용 점수 조회 상태에 따른 UI 표기 분기 */}
          {!hasCreditHistory ? (
            // 조회 이력 없음
            <p className="text-left text-xl font-bold text-black">
              아직 평가 이력이 없어요
            </p>
          ) : (
            // 조회 이력 O → 현재 점수 + 예측 점수
            <div>
              <p className="text-left text-xl font-bold text-black">
                {t("components.complete.currentScore")}{" "}
                <span className="font-bold text-[#1A3668]">{creditScore}</span>
                {t("components.creditPointBanner.point")}
              </p>

              <section className="flex flex-col gap-4">
                <CreditScoreBanner label="6개월 정기 송금시" point={sixScore} />
                <CreditScoreBanner
                  label="12개월 정기 송금시"
                  point={twelveScore}
                />
                <CreditScoreBanner
                  label="18개월 정기 송금시"
                  point={eighteenScore}
                />
              </section>
            </div>
          )}

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
