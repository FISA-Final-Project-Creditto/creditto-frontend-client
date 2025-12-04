"use client";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AgreePage() {
  const t = useTranslations("signup.agree");
  const router = useRouter();
  const [checked, setChecked] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });

  const toggleAll = () => {
    const newState = !checked.all;
    setChecked({
      all: newState,
      terms1: newState,
      terms2: newState,
      terms3: newState,
      terms4: newState,
    });
  };

  const toggleOne = (key) => {
    const newChecked = { ...checked, [key]: !checked[key] };
    const allChecked =
      newChecked.terms1 &&
      newChecked.terms2 &&
      newChecked.terms3 &&
      newChecked.terms4;
    setChecked({ ...newChecked, all: allChecked });
  };

  const terms = [
    { key: "terms1", text: t("terms1") },
    { key: "terms2", text: t("terms2") },
    { key: "terms3", text: t("terms3") },
    { key: "terms4", text: t("terms4") },
  ];

  return (
    <>
      <AppHeader title={t("title")} show={true} showHamburger={true} />
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
                : "border-gray-400 bg-white"
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
          {terms.map(({ key, text }) => (
            <li key={key}>
              <label
                onClick={() => toggleOne(key)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 border rounded-sm transition-colors ${
                    checked[key]
                      ? "border-[#1A3668] bg-[#1A3668]"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {checked[key] && (
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
                <p className="text-[15px] text-gray-700 leading-relaxed">
                  {text}
                </p>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full  h-[118px]  flex justify-center">
        <button
          disabled={!checked.terms1 || !checked.terms2 || !checked.terms3}
          className={`w-[90%] h-[60px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg
            ${
              checked.terms1 && checked.terms2 && checked.terms3
                ? "bg-[#1A3668] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          onClick={() => {
            router.push("/signup/phone");
          }}
        >
          {t("next")}
        </button>
      </div>
    </>
  );
}
