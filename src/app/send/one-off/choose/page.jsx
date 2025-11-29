"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { US, CN, JP } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../../components/BottomBar";
import {
  setRecipientInfo,
  setSelectedCountry as setReduxSelectedCountry,
} from "@/src/store/features/send/sendSlice";

const BANK_OPTIONS = {
  USD: [
    { name: "JP모건 체이스", code: "JPMCUS33" },
    { name: "뱅크 오브 아메리카", code: "BOFAUS3N" },
    { name: "웰스 파고", code: "WFBIUS6S" },
  ],
  CNY: [
    { name: "교통은행", code: "COMMCNSH" },
    { name: "중국은행", code: "BKCHCNBJ" },
    { name: "중국농업은행", code: "ABOCCNBJ" },
  ],
  JPY: [
    { name: "미쓰비시UFJ은행", code: "BOTKJPJT" },
    { name: "미쓰이스미토모은행", code: "SMBCJPJT" },
    { name: "미즈호은행", code: "MHCBJPJT" },
  ],
};

export default function ChooseCountryPage() {
  const [selectedCountry, setSelectedCountry] = useState(""); // 기본 선택값 없음
  const [selectedBank, setSelectedBank] = useState({ name: "", code: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <header>
        <AppHeader
          title="해외 송금"
          show={true}
          showHamburger={false}
          showBack={true}
        />
      </header>

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
        <section className="flex flex-col gap-6"></section>
        {/* 선택 국가 리스트 */}
        <article className="flex flex-col gap-4">
          {[
            {
              code: "US",
              currency: "USD",
              name: "미국",
              currencyName: "달러",
              Icon: US,
            },
            {
              code: "CN",
              currency: "CNY",
              name: "중국",
              currencyName: "위안",
              Icon: CN,
            },
            {
              code: "JP",
              currency: "JPY",
              name: "일본",
              currencyName: "엔",
              Icon: JP,
            },
          ].map(({ code, currency, name, currencyName, Icon }) => (
            <div key={code}>
              <button
                className="flex w-full items-center justify-between"
                type="button"
                onClick={() => {
                  setSelectedCountry(selectedCountry === code ? "" : code);
                  setSelectedBank({ name: "", code: "" }); // 국가 변경 시 은행 선택 초기화
                  dispatch(setReduxSelectedCountry(code));
                }}
              >
                <div
                  className={clsx(
                    "w-full flex items-center gap-10 border px-3 py-3 rounded-lg transition-colors",
                    selectedCountry === code
                      ? "border-[#4485EE]"
                      : "border-[#C9CDD4]"
                  )}
                >
                  <Icon className="w-15 h-auto rounded-[0.375rem] overflow-hidden" />
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[18px] font-semibold text-[#1F2329]">
                      {name} {currency}
                    </span>
                    <span className="text-sm font-medium text-[#86909C]">
                      {currencyName}
                    </span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {selectedCountry === code && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 pl-4">
                      <h3 className="text-left font-semibold text-gray-700 mb-2">
                        은행 선택
                      </h3>
                      {BANK_OPTIONS[currency].map((bank) => (
                        <button
                          key={bank.code}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={clsx(
                            "w-full text-left p-3 rounded-md transition-colors",
                            selectedBank.code === bank.code
                              ? "bg-[#1A3668] text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          )}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </article>
      </main>

      {/* 하단 버튼 */}
      <footer className="pt-20">
        <BottomBar
          label="선택"
          onClick={() => {
            if (selectedCountry && selectedBank.code) {
              // 선택된 은행 정보(bankName, bankCode)를 Redux에 저장
              dispatch(
                setRecipientInfo({
                  bankName: selectedBank.name,
                  bankCode: selectedBank.code,
                })
              );
              router.push("/send/one-off");
            }
          }}
          isActive={selectedCountry !== "" && selectedBank.code !== ""}
        />
      </footer>
    </div>
  );
}
