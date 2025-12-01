"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { US, JP, MY, TH } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../../components/BottomBar";
import {
  setRecipientInfo,
  setCountryData as setReduxSelectedCountry,
} from "@/src/store/features/send/sendSlice";

const BANK_OPTIONS = {
  USD: [
    { name: "JP모건 체이스", code: "JPMCUS33" },
    { name: "뱅크 오브 아메리카", code: "BOFAUS3N" },
    { name: "웰스 파고", code: "WFBIUS6S" },
  ],
  JPY: [
    { name: "미쓰비시UFJ은행", code: "BOTKJPJT" },
    { name: "미쓰이스미토모은행", code: "SMBCJPJT" },
    { name: "미즈호은행", code: "MHCBJPJT" },
  ],
  MYR: [
    { name: "메이뱅크", code: "MBBEMYKL" },
    { name: "CIMB", code: "BNIAIDJA" },
    { name: "퍼블릭 뱅크", code: "PBLLMYKA" },
  ],
  THB: [
    { name: "방콕 은행", code: "BKKBTHB1" },
    { name: "끄룽타이은행", code: "KRTHTHBK" },
    { name: "시암 상업 은행", code: "SICOTHBK" },
  ],
};

export default function ChooseCountryPage() {
  const [selectedCountry, setSelectedCountry] = useState(""); // 기본 선택값 없음
  const [selectedBank, setSelectedBank] = useState({ name: "", code: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("send");

  const BANK_OPTIONS = {
    USD: [
      { name: t("oneOff.choose.bankJPMorgan"), code: "JPMCUS33" },
      { name: t("oneOff.choose.bankBOA"), code: "BOFAUS3N" },
      { name: t("oneOff.choose.bankWellsFargo"), code: "WFBIUS6S" },
    ],
    CNY: [
      { name: t("oneOff.choose.bankBOC"), code: "COMMCNSH" },
      { name: t("oneOff.choose.bankICBC"), code: "BKCHCNBJ" },
      { name: t("oneOff.choose.bankABC"), code: "ABOCCNBJ" },
    ],
    JPY: [
      { name: t("oneOff.choose.bankMUFG"), code: "BOTKJPJT" },
      { name: t("oneOff.choose.bankSMBC"), code: "SMBCJPJT" },
      { name: t("oneOff.choose.bankMizuho"), code: "MHCBJPJT" },
    ],
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

      <main className="flex flex-col gap-[2.188rem] px-5">
        <section>
          <h1 className="text-left mt-[3.75rem] text-[1.563rem] font-bold">
            <span className="text-[#1A3668]">
              {t("common.remittance")}
            </span>{" "}
            {t("chooseCountry.title")}
          </h1>
          <p className="text-sm text-left text-[#86909C]">
            {t("chooseCountry.subtitle")}
          </p>
        </section>
        <section className="flex flex-col gap-6"></section>
        {/* 선택 국가 리스트 */}
        <article className="flex flex-col gap-4">
          {[
            {
              code: "US",
              currency: "USD",
              name: t("oneOff.choose.countryUSA"),
              currencyName: t("chooseCountry.dollar"),
              Icon: US,
            },
            {
              code: "JP",
              currency: "JPY",
              name: t("oneOff.choose.countryJapan"),
              currencyName: t("chooseCountry.yen"),
              Icon: JP,
            },
            {
              code: "MY",
              currency: "MYR",
              name: "말레이시아",
              currencyName: "링깃",
              Icon: MY,
            },
            {
              code: "TH",
              currency: "THB",
              name: "태국",
              currencyName: "바트",
              Icon: TH,
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
                        {t("chooseCountry.selectBank")}
                      </h3>
                      {BANK_OPTIONS[currency]?.map((bank) => (
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
          label={t("chooseCountry.select")}
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
