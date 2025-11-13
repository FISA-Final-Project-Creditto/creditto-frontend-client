"use client";

import { ChevronDown } from "lucide-react";
import Header from "../../components/Header";
import StepProgressBar from "../components/StepProgressbar";
import DatePicker from "./components/DatePicker";
import { useState } from "react";
import BottomBar from "../../components/BottomBar";
import { useRouter } from "next/navigation";

export default function TypePage() {
  const router = useRouter();

  // 송금 유형 정보값 상태 관리
  const [formData, setFormData] = useState({
    transferMethod: "", // 송금 방식
    accountNumber: "", // 송금 계좌
    currencyCode: "", // 통화 코드
    amount: "", // 외화 거래 금액
    frequency: "", // 송금 주기
    frequencyDetail: "", // 송금 주기 상세
    startDate: "", // 송금 시작일
  });

  const handleAmountChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setFormData({ ...formData, amount: "" });
      return;
    }
    const formattedValue = new Intl.NumberFormat().format(Number(rawValue));
    setFormData({ ...formData, amount: formattedValue });
  };

  // 계좌 자동 하이픈 생성 함수
  const handleAccountNumberChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, "");
    let formattedValue = "";

    // 4자리 - 3자리 - 6자리
    if (rawValue.length > 0) {
      formattedValue = rawValue.substring(0, 4);
    }
    if (rawValue.length > 4) {
      formattedValue += "-" + rawValue.substring(4, 7);
    }
    if (rawValue.length > 7) {
      formattedValue += "-" + rawValue.substring(7, 13);
    }

    setFormData({ ...formData, accountNumber: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a submission-ready object with raw values
    const submissionData = {
      ...formData,
      amount: formData.amount.replace(/,/g, ""),
      accountNumber: formData.accountNumber.replace(/-/g, ""),
    };
    console.log("Form submitted:", submissionData);
  };

  return (
    <main>
      {/* 상단 바 */}
      <Header />

      {/* 프로그레스 바 */}
      <StepProgressBar current={1} total={4} />

      <section className="flex flex-col gap-[2.188rem] mt-4">
        <h1 className="text-left text-[1.563rem] font-bold">
          <span className="text-[#1A3668]">해외 송금</span> 기본 정보를
          <br />
          입력해주세요
        </h1>

        <hr className="border-t border-[#E5E6EB]" />

        <section className="flex flex-col gap-6">
          <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
            송금 유형
          </h2>

          <h3 className="text-left text-[1.125rem] text-black font-semibold">
            소액 송금 (USD 기준 5천불 이하)
          </h3>

          {/* 입력칸 */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[1.875rem]"
          >
            {/* 송금 방식 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                송금 방식
              </label>
              <div className="relative w-full">
                <select
                  value={formData.transferMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, transferMethod: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                >
                  <option value="">송금 방식을 선택하세요</option>
                  <option value="foreign">외화 정액 송금</option>
                  <option value="krw">원화 정액 송금</option>
                  <option value="account">계좌 잔액 송금</option>
                  <option value="instant">잔액 즉시 송금</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 송금 계좌 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                송금 계좌
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={handleAccountNumberChange}
                placeholder="송금할 계좌번호를 입력하세요"
                className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] placeholder:text-[#86909C] focus:outline-none"
              />
            </div>

            {/* 통화 코드 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                통화 코드
              </label>
              <div className="relative w-full">
                <select
                  value={formData.currencyCode}
                  onChange={(e) =>
                    setFormData({ ...formData, currencyCode: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                >
                  <option value="">
                    송금 통화를 선택하세요 (예: USD, JPY 등)
                  </option>
                  <option value="USD">USD - 미국 달러</option>
                  <option value="JPY">JPY - 일본 엔화</option>
                  <option value="CHY">CHY - 중국 위안화</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 외화 거래 금액 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                외화 거래 금액
              </label>
              <input
                type="text" // Use 'text' to allow commas
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="송금할 금액을 입력하세요"
                className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] placeholder:text-[#86909C] focus:outline-none"
              />
            </div>

            {/* 송금 주기 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                송금 주기
              </label>
              <div className="relative w-full">
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                >
                  <option value="">송금 주기를 선택하세요 (매월 / 매주)</option>
                  <option value="monthly">매월</option>
                  <option value="weekly">매주</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 송금 주기 상세 */}
            <div className="flex flex-col items-start">
              <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                송금 주기 상세
              </label>
              <div className="relative w-full">
                <select
                  value={formData.frequencyDetail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequencyDetail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none"
                >
                  <option value="">송금 주기의 상세 시점을 선택하세요</option>
                  <option value="1">1월</option>
                  <option value="2">2월</option>
                  <option value="3">3월</option>
                  <option value="4">4월</option>
                  <option value="5">5월</option>
                  <option value="6">6월</option>
                  <option value="7">7월</option>
                  <option value="8">8월</option>
                  <option value="9">9월</option>
                  <option value="10">10월</option>
                  <option value="11">11월</option>
                  <option value="12">12월</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 송금 시작일 */}
            <div className="flex flex-col items-start">
              <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                송금 시작일
              </label>
              <DatePicker
                value={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
              />
            </div>
          </form>
        </section>
        <BottomBar
          label="다음"
          onClick={() => router.push("/send/information/remittance")}
        />
      </section>
    </main>
  );
}
