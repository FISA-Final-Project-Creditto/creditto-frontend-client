"use client";

import { ChevronDown } from "lucide-react";
import Header from "../../components/Header";
import StepProgressBar from "../components/StepProgressbar";
import DatePicker from "./components/DatePicker";
import { useState } from "react";
import BottomBar from "../../components/BottomBar";
import { useRouter } from "next/navigation";

// 요일
const DAYS = [
  { name: "월요일", value: "MONDAY" },
  { name: "화요일", value: "TUESDAY" },
  { name: "수요일", value: "WEDNESDAY" },
  { name: "목요일", value: "THRUSDAY" },
  { name: "금요일", value: "FRIDAY" },
  { name: "토요일", value: "SATURDAY" },
  { name: "일요일", value: "SUNDAY" },
];

export default function TypePage() {
  const router = useRouter();

  // 송금 유형 정보값 상태 관리
  const [formData, setFormData] = useState({
    accountNO: "1002-123-456789", // 송금 계좌(계좌 페이지에 설정되어있기 때문에 거기서 가져오면 될 듯)
    receiveCurrency: "", // 수취 통화 코드
    sendCurrency: "", // 송금 통화 코드
    sendAmount: "", // 외화 거래 금액
    regRemStatus: "ACTIVE", // 정기 송금 설정(수정 시 PAUSED/CANCELLED로 변경 가능 -> ENUM 타입)
    regRemType: "", // 송금 주기
    scheduled: "", // 송금 주기 상세(달별/주별 정기 송금일)
    startDate: "", // 송금 시작일
  });

  // 폼 유효성 검사
  const isFormValid =
    formData.accountNO.trim() !== "" &&
    formData.receiveCurrency.trim() !== "" &&
    formData.sendCurrency.trim() !== "" &&
    formData.sendAmount.trim() !== "" &&
    formData.regRemStatus.trim() !== "" &&
    formData.regRemType.trim() !== "" &&
    formData.scheduled.trim() !== "" &&
    formData.startDate.trim() !== "";

  // 공통 input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setFormData({ ...formData, sendAmount: "" });
      return;
    }
    const formattedValue = new Intl.NumberFormat().format(Number(rawValue));
    setFormData({ ...formData, sendAmount: formattedValue });
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

    setFormData({ ...formData, accountNO: formattedValue });
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      const submissionData = {
        ...formData,
        sendAmount: formData.sendAmount.replace(/,/g, ""),
        accountNO: formData.accountNO.replace(/-/g, ""),
      };
      console.log("Form submitted:", submissionData);

      router.push("/send/information/remittance");
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
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
            {/* 송금 계좌 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                송금 계좌
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formData.accountNO}
                onChange={handleAccountNumberChange}
                placeholder="송금할 계좌번호를 입력하세요"
                className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
              />
            </div>

            {/* 수취 통화 코드 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                수취 통화 코드
              </label>
              <div className="relative w-full">
                <select
                  name="receiveCurrency"
                  value={formData.receiveCurrency}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                    formData.receiveCurrency === ""
                      ? "text-[#86909C]"
                      : "text-black"
                  }`}
                >
                  <option value="">
                    수취 통화를 선택하세요 (예: USD, JPY 등)
                  </option>
                  <option value="USD">USD - 미국 달러</option>
                  <option value="JPY">JPY - 일본 엔화</option>
                  <option value="CNY">CNY - 중국 위안화</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
              </div>
            </div>

            {/* 송금 통화 코드 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                송금 통화 코드
              </label>
              <div className="relative w-full">
                <select
                  name="sendCurrency"
                  value={formData.sendCurrency}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                    formData.sendCurrency === ""
                      ? "text-[#86909C]"
                      : "text-black"
                  }`}
                >
                  <option value="">
                    송금 통화를 선택하세요 (예: KRW, USD 등)
                  </option>
                  <option value="KRW">KRW - 한국 원화</option>
                  <option value="USD">USD - 미국 달러</option>
                  <option value="JPY">JPY - 일본 엔화</option>
                  <option value="CNY">CNY - 중국 위안화</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
              </div>
            </div>

            {/* 외화 거래 금액 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                외화 거래 금액
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formData.sendAmount}
                onChange={handleAmountChange}
                placeholder="송금할 금액을 입력하세요"
                className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
              />
            </div>

            {/* 송금 주기 */}
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                송금 주기
              </label>
              <div className="relative w-full">
                <select
                  name="regRemType"
                  value={formData.regRemType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none ${
                    formData.regRemType === "" ? "text-[#86909C]" : "text-black"
                  }`}
                >
                  <option value="">송금 주기를 선택하세요 (매월 / 매주)</option>
                  <option value="monthly">매월</option>
                  <option value="weekly">매주</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
              </div>
            </div>

            {/* 송금 주기 상세 */}
            <div className="flex flex-col items-start">
              <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                송금 주기 상세
              </label>
              <div className="relative w-full">
                <select
                  name="scheduled"
                  value={formData.scheduled}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                    formData.scheduled === "" ? "text-[#86909C]" : "text-black"
                  }`}
                >
                  <option value="">송금 주기의 상세 시점을 선택하세요</option>
                  {formData.regRemType === "monthly" &&
                    Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}일
                      </option>
                    ))}
                  {formData.regRemType === "weekly" &&
                    DAYS.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.name}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
              </div>
            </div>

            {/* 송금 시작일 */}
            <div className="flex flex-col items-start">
              <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                송금 시작일
              </label>
              <DatePicker
                value={formData.startDate}
                onChange={handleDateChange}
              />
            </div>
          </form>
        </section>
        <BottomBar label="다음" onClick={handleSubmit} isActive={isFormValid} />
      </section>
    </main>
  );
}
