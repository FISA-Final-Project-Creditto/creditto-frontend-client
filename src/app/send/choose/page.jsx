"use client";

import React, { useState } from "react";
import { US, CN, JP } from "country-flag-icons/react/3x2";
import BottomBar from "../components/BottomBar";
import { useRouter } from "next/navigation";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setSelectedCountry } from "@/src/store/features/send/sendSlice";

export default function ChooseCountryPage() {
  const [selectedCountry, setSelectedCountryState] = useState(""); // 로컬 state
  const router = useRouter();
  const dispatch = useDispatch();

  // 국가 선택 핸들러
  const handleSelectCountry = (code) => {
    setSelectedCountryState(code);
  };

  // 선택 버튼 클릭 시 실행
  const handleSubmit = () => {
    if (!selectedCountry) return;

    // Redux에 저장
    dispatch(setSelectedCountry(selectedCountry));

    // 다음 페이지 이동
    router.push("/send/information/type");
  };

  return (
    <div>
      <AppHeader
        title="해외 송금"
        show={true}
        showHamburger={false}
        showBack={true}
      />

      <main className="flex flex-col gap-[2.188rem] px-5">
        <section>
          <h1 className="text-left mt-[3.75rem] text-[1.563rem] font-bold">
            <span className="text-[#1A3668]">해외 송금</span> 국가를
            <br />
            선택해주세요
          </h1>
          <p className="text-sm text-left text-[#86909C]">
            송금하실 국가의 통화를 선택해주세요.
          </p>
        </section>

        {/* 선택 국가 리스트 */}
        <article className="flex flex-col gap-6">
          {/* 미국 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => handleSelectCountry("US")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                selectedCountry === "US"
                  ? "border-[#4485EE]"
                  : "border-[#C9CDD4]"
              )}
            >
              <US className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  미국 USD
                </span>
                <span className="text-sm font-medium text-[#86909C]">달러</span>
              </div>
            </div>
          </button>

          {/* 중국 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => handleSelectCountry("CN")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                selectedCountry === "CN"
                  ? "border-[#4485EE]"
                  : "border-[#C9CDD4]"
              )}
            >
              <CN className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  중국 CNY
                </span>
                <span className="text-sm font-medium text-[#86909C]">위안</span>
              </div>
            </div>
          </button>

          {/* 일본 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => handleSelectCountry("JP")}
          >
            <div
              className={clsx(
                "w-full flex items-center gap-10 border px-3 py-3 rounded-lg",
                selectedCountry === "JP"
                  ? "border-[#4485EE]"
                  : "border-[#C9CDD4]"
              )}
            >
              <JP className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
              <div className="flex flex-col items-start justify-center">
                <span className=" text-[18px] font-semibold text-[#1F2329]">
                  일본 JPY
                </span>
                <span className="text-sm font-medium text-[#86909C]">엔</span>
              </div>
            </div>
          </button>
        </article>
      </main>

      {/* 하단 버튼 */}
      <footer className="pt-20">
        <BottomBar
          label="선택"
          onClick={handleSubmit}
          isActive={!!selectedCountry}
        />
      </footer>
    </div>
  );
}
