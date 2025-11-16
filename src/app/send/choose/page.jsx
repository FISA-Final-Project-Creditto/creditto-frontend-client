"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { US, CN, JP } from "country-flag-icons/react/3x2";
import { Check } from "lucide-react";
import BottomBar from "../components/BottomBar";
import { useRouter } from "next/navigation";

export default function ChooseCountryPage() {
  const [selectedCountry, setSelectedCountry] = useState(""); // 기본 선택값 없음
  const router = useRouter();

  return (
    <div>
      <header>
        <Header />
      </header>

      <section className="flex flex-col gap-[2.188rem]">
        <h1 className="text-left mt-[3.75rem] text-[1.563rem] font-bold">
          <span className="text-[#1A3668]">해외 송금</span> 국가를
          <br />
          선택해주세요
        </h1>

        <hr className="border-t border-[#E5E6EB]" />

        {/* 선택 국가 리스트 */}
        <article className="flex flex-col gap-6">
          {/* 미국 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setSelectedCountry("US")}
          >
            <div className="flex items-center">
              <US className="w-20 h-auto rounded-[0.375rem] overflow-hidden" />
              <span className="ml-[1.875rem] text-[18px] font-semibold text-[#1F2329]">
                미국 USD(달러)
              </span>
            </div>
            {selectedCountry === "US" && (
              <Check className="w-6 h-6 text-[#619AF4]" />
            )}
          </button>

          {/* 중국 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setSelectedCountry("CN")}
          >
            <div className="flex items-center">
              <CN className="w-20 h-auto rounded-[0.375rem] overflow-hidden" />
              <span className="ml-[1.875rem] text-[18px] font-semibold text-[#1F2329]">
                중국 CNY(위안)
              </span>
            </div>
            {selectedCountry === "CN" && (
              <Check className="w-6 h-6 text-[#619AF4]" />
            )}
          </button>

          {/* 일본 */}
          <button
            className="flex w-full items-center justify-between"
            type="button"
            onClick={() => setSelectedCountry("JP")}
          >
            <div className="flex items-center">
              <JP className="w-20 h-auto rounded-[0.375rem] overflow-hidden border border-[#C8CCD5]" />
              <span className="ml-[1.875rem] text-[18px] font-semibold text-[#1F2329]">
                일본 JPY(엔)
              </span>
            </div>
            {selectedCountry === "JP" && (
              <Check className="w-6 h-6 text-[#619AF4]" />
            )}
          </button>
        </article>
      </section>

      {/* 하단 버튼 */}
      <footer className="pt-20">
        {selectedCountry !== "" && (
          <BottomBar
            label="선택"
            onClick={() => router.push("/send/information/type")}
            isActive={true}
          />
        )}
      </footer>
    </div>
  );
}
