"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { US, JP, MY, TH } from "country-flag-icons/react/3x2";
import BottomBar from "../../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import clsx from "clsx";
import {
  setReceiveCurrency,
  setCountryData,
} from "@/src/store/features/send/sendSlice";
import { useTranslations } from "next-intl";

export default function ChooseCountryPage() {
  const [localSelectedCountry, setLocalSelectedCountry] = useState(""); // 이름 변경
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("send");

  const handleSelectButtonClick = () => {
    const currencyMap = {
      US: "USD", // 미국
      JP: "JPY", // 일본
      MY: "MYR", // 말레이시아
      TH: "THB", // 태국
    };
    const currency = currencyMap[localSelectedCountry];
    if (currency) {
      dispatch(setReceiveCurrency(currency));
      dispatch(setCountryData(localSelectedCountry)); // Redux 액션 호출
    }
    router.push("/send/regular/information/type");
  };

  return (
    <div>
      <header>
        <AppHeader
          title={t("common.remittance")}
          show={true}
          showHamburger={false}
          showBack={true}
        />
      </header>

      <main className="flex flex-col gap-[2.188rem] px-8">
        <section>
          <h1 className="text-left mt-[3.75rem] text-[1.563rem] font-bold whitespace-pre-line">
            {/* <span className="text-[#1A3668]">{t("common.remittance")}</span>{" "} */}
            {t("regular.chooseCountry.title")}
          </h1>
          <p className="text-sm text-left text-[#86909C]">
            {t("regular.chooseCountry.subtitle")}
          </p>
        </section>

        {/* 선택 국가 리스트 */}
        <article className="flex flex-col gap-6">
          {/* 미국 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setLocalSelectedCountry("US")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                localSelectedCountry === "US"
                  ? "border-[#4485EE]"
                  : " border-[#C9CDD4]"
              )}
            >
              <US className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  {t("regular.chooseCountry.usa")}
                </span>
                <span className="text-sm font-medium text-[#86909C]">
                  {t("regular.chooseCountry.dollar")}
                </span>
              </div>
            </div>
          </button>

          {/* 일본 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setLocalSelectedCountry("JP")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                localSelectedCountry === "JP"
                  ? "border-[#4485EE]"
                  : " border-[#C9CDD4]"
              )}
            >
              <JP className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  {t("regular.chooseCountry.japan")}
                </span>
                <span className="text-sm font-medium text-[#86909C]">
                  {t("regular.chooseCountry.yen")}
                </span>
              </div>
            </div>
          </button>

          {/* 말레이시아 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setLocalSelectedCountry("MY")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                localSelectedCountry === "MY"
                  ? "border-[#4485EE]"
                  : " border-[#C9CDD4]"
              )}
            >
              <MY className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  {t("regular.chooseCountry.malaysia")}
                </span>
                <span className="text-sm font-medium text-[#86909C]">
                  {t("regular.chooseCountry.ringgit")}
                </span>
              </div>
            </div>
          </button>

          {/* 태국 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setLocalSelectedCountry("TH")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                localSelectedCountry === "TH"
                  ? "border-[#4485EE]"
                  : " border-[#C9CDD4]"
              )}
            >
              <TH className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  {t("regular.chooseCountry.thailand")}
                </span>
                <span className="text-sm font-medium text-[#86909C]">
                  {t("regular.chooseCountry.baht")}
                </span>
              </div>
            </div>
          </button>
        </article>
      </main>

      {/* 하단 버튼 */}
      <footer className="pt-20">
        {localSelectedCountry !== "" && (
          <BottomBar
            label={t("regular.chooseCountry.select")}
            onClick={handleSelectButtonClick}
            isActive={true}
          />
        )}
      </footer>
    </div>
  );
}
