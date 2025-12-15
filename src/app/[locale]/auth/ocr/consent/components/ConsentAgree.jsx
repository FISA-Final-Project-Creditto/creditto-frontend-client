"use client";

import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import { clearModeData } from "@/src/store/features/send/sendModeSlice";
import { useTranslations } from "next-intl";

export default function ConsentAgree({
  title, // title prop은 이제 useTranslations 훅에서 가져온 값을 사용하므로 기본값을 제거합니다.
  consents = [], // 약관 동의서 리스트
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("auth.ocrConsent");
  const consentChecked = useSelector((state) => state.consent.checked);

  // 체크 상태: { all: false, consent1: false, consent2: false, ... }
  const [checked, setChecked] = useState(() =>
    consents.reduce(
      (acc, consent) => ({
        ...acc,
        [consent.id]: !!consentChecked[consent.id],
      }),
      { all: false }
    )
  );

  // 필수 약관 리스트
  const requiredConsents = consents.filter((c) => c.required);

  // 전체 동의 클릭
  const toggleAll = () => {
    // 이미 전체 동의 상태라면 전체 해제
    if (checked.all) {
      const updated = consents.reduce(
        (acc, consent) => ({ ...acc, [consent.id]: false }),
        { all: false }
      );

      setChecked(updated);

      consents.forEach((consent) => {
        dispatch(setConsentChecked({ id: consent.id, checked: false }));
      });

      return;
    }

    // 전체 동의 상태가 아니라면 모든 약관 체크
    const updated = consents.reduce(
      (acc, consent) => ({ ...acc, [consent.id]: true }),
      { all: true }
    );

    setChecked(updated);

    consents.forEach((consent) => {
      dispatch(setConsentChecked({ id: consent.id, checked: true }));
    });
  };

  // 개별 토글
  const toggleOne = (id) => {
    const newChecked = { ...checked, [id]: !checked[id] };

    const allChecked =
      consents.length > 0 &&
      consents.every((consent) => newChecked[consent.id]);

    setChecked({ ...newChecked, all: allChecked });
    dispatch(setConsentChecked({ id, checked: newChecked[id] }));
  };

  // 필수 약관이 모두 체크됐는지 여부
  const isRequiredAllChecked = consents
    .filter((t) => t.required)
    .every((t) => checked[t.id]);

  // 전역 상태가 바뀌면 로컬 checked도 동기화 후 all도 다시 계산
  useEffect(() => {
    const synChecked = () => {
      const updatedFlags = consents.reduce(
        (acc, consent) => ({
          ...acc,
          [consent.id]: !!consentChecked[consent.id],
        }),
        {}
      );

      const allChecked =
        consents.length > 0 &&
        consents.every((consent) => updatedFlags[consent.id]);

      setChecked((prev) => ({
        ...prev,
        ...updatedFlags,
        all: allChecked,
      }));
    };

    synChecked();
  }, [consents, consentChecked]);

  // 다음 버튼(다음 단계로 이동 + 동의 상태 초기화)
  const handleNext = () => {
    if (!isRequiredAllChecked) return;

    // Redux 초기화
    consents.forEach((consent) => {
      dispatch(setConsentChecked({ id: consent.id, checked: false }));
    });

    // 로컬 상태 초기화
    const resetChecked = consents.reduce(
      (acc, consent) => ({ ...acc, [consent.id]: false }),
      { all: false }
    );
    setChecked(resetChecked);

    router.push("/auth/ocr/identification");
  };

  return (
    <>
      <AppHeader title={t("title")} show={true} showHamburger={false} />

      <div className="flex-1 px-8 pt-16 pb-10 text-left">
        {/* 전체 동의 */}
        <label
          onClick={toggleAll}
          className="flex items-center w-full h-[60px] cursor-pointer border-b border-[#E5E6EB]"
        >
          <span
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-full mr-3 transition-colors ${
              checked.all
                ? "border-[#1A3668] bg-[#1A3668]"
                : "border-[#C9CDD4] bg-white"
            }`}
          >
            {checked.all && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
          <h1 className="text-[20px] font-bold text-[#4E5969]">
            {t("agreeAll")}
          </h1>
        </label>

        {/* 개별 약관 */}
        <ul className="mt-6 space-y-6">
          {consents.map(({ id, label, required }) => (
            <li key={id}>
              {/* 행 전체 클릭 시 바로 toggleOne */}
              <label
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleOne(id)}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 border rounded-sm transition-colors ${
                    checked[id]
                      ? "border-[#1A3668] bg-[#1A3668]"
                      : "border-[#C9CDD4] bg-white"
                  }`}
                >
                  {checked[id] && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>

                <p className="text-[15px] text-[#4E5969] leading-relaxed">
                  <span className="text-[#4E5969] mr-1">{t("required")}</span>
                  {label}
                </p>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full h-[118px] flex justify-center">
        <button
          disabled={!isRequiredAllChecked}
          className={`w-[90%] h-[60px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg
            ${
              isRequiredAllChecked
                ? "bg-[#1A3668] text-white cursor-pointer"
                : "bg-[#E5E6EB] text-[#86909C] cursor-not-allowed"
            }`}
          onClick={handleNext}
        >
          {t("next")}
        </button>
      </div>
    </>
  );
}
