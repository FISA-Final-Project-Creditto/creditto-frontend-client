"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Emoji from "../components/Emoji";
import BottomSheet from "@/src/common/UI/BottomSheet/BottomSheet";
import { credittoApi } from "@/src/app/api/axios";
import { useDispatch } from "react-redux";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useTranslations } from "next-intl";

export default function CreditFirst() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations("creditFirst");

  useEffect(() => {
    // 약관 ID 리스트 아이디 초기화
    const consentIds = [1, 2, 3];

    // 각 약관의 체크 상태를 false로 초기화
    consentIds.forEach((id) => {
      dispatch(setConsentChecked({ id: String(id), checked: false }));
    });
  }, [dispatch]);

  return (
    <main className="h-dvh flex justify-center items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto justify-start flex flex-col bg-white">
        <AppHeader
          title={t("title")}
          showHamburger={false}
          showBack={true}
          show={true}
          onBackClick={() => router.replace("/main")} // 메인페이지로 이동하는 건 replace로
        />
        <div className="mt-8 text-2xl font-bold text-left ml-5 h-20">
          <span className="text-[#0C72BA] font-bold text-[26px]">{t("whats_good_pt1")}</span>{" "}
          {t("whats_good_pt2")} <br />
          <span>{t("whats_good_pt3")}</span>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[150px] h-[150px] ">
            <Emoji />
          </div>
        </div>
        <div className="mt-5 text-xl font-medium text-left ml-5 h-15">
          <span>{t("merit1_pt1")}</span>
          <br />
          <span>{t("merit1_pt2")}</span>
        </div>
        <div className="mt-5 text-xl font-medium text-left ml-5 h-15">
          <span>{t("merit2_pt1")}</span>
          <br />
          <span>{t("merit2_pt2")}</span>
        </div>

        <div className="w-full flex flex-col justify-center mt-auto mb-14 px-4">
          <div
            className="w-full h-20 cursor-pointer flex justify-center items-center text-[#86909C] underline text-lg"
            onClick={async (e) => {
              e.stopPropagation();
              try {
                const accessToken = sessionStorage.getItem("accessToken");
                const userId = sessionStorage.getItem("userId");
                if (!accessToken || !userId) {
                  router.push("/signup/permission");
                  return;
                }

                const res = await credittoApi.get(
                  `/api/credit-score/${userId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );

                // API 조회 성공 시, 점수를 localStorage에 저장합니다.
                const newScore = res.data?.credit_score;
                if (newScore !== undefined) {
                  const userScoreKey = `creditScore_${userId}`;
                  localStorage.setItem(userScoreKey, String(newScore));
                }

                router.push("/main");
              } catch (error) {
                // 실패 시 권한/설정 페이지로 이동
                router.push("/signup/permission");
              }
            }}
          >
            {t("inquiry_no_link")}
          </div>
          <div
            className="cursor-pointer w-full max-w-[440px] h-[60px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg bg-[#1A3668] text-white"
            onClick={() => router.push("/credit/consent")}
          >
            {t("inquiry_foreign_account")}
          </div>
        </div>

        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          title={t("bottom_sheet_title")}
        >
          <div className="px-3 pb-6 text-sm">
            {/* 체크 항목 */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  {t("consent1")}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  {t("consent2")}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  {t("consent3")}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  {t("consent4")}
                </div>
              </div>
            </div>

            {/* 동의 버튼 */}
            <button
              className="w-full h-14 rounded-xl text-[16px] font-semibold flex items-center justify-center transition-colors bg-[#1A3668] text-white"
              onClick={() => {
                setOpen(false);
                router.push("/credit/foregin_account");
              }}
            >
              {t("agree_button")}
            </button>

            <div className="mt-3 text-center">
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => setOpen(false)}
              >
                {t("close_button")}
              </button>
            </div>
          </div>
        </BottomSheet>
      </div>
    </main>
  );
}
