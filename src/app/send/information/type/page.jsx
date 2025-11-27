"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import StepProgressBar from "../components/StepProgressbar";
import DatePicker from "./components/DatePicker";
import BottomBar from "../../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import {
  setTypeData,
  setReceivedCurrency,
} from "@/src/store/features/send/sendSlice";

// 요일
const DAYS = [
  { name: "월요일", value: "MONDAY" },
  { name: "화요일", value: "TUESDAY" },
  { name: "수요일", value: "WEDNESDAY" },
  { name: "목요일", value: "THRUSDAY" },
  { name: "금요일", value: "FRIDAY" },
];

// 국가별 통화 코드
const currency = {
  US: "USD",
  CN: "CNY",
  JP: "JPY",
};

// 연결된 계좌
// ✅ TODO: useSelector로 계좌들을 가져오기
const connectedAccounts = ["1002-123-123124", "1002-346-346234"];

export default function TypePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.send.selectedCountry); // 선택된 국가 가져오기
  const receiveCurrency = currency[selectedCountry]; // 수취 통화 코드
  const sendCurrency = "KRW"; // 송금 통화 코드를 KRW로 고정

  // 송금 유형 정보값 상태 관리
  const [formData, setFormData] = useState({
    accountNo: "", // 송금 계좌(계좌 페이지에 설정되어있기 때문에 거기서 가져오면 될 듯)
    sendAmount: "", // 외화 거래 금액
    regRemType: "", // 송금 주기
    scheduled: 0 || "", // 송금 주기 상세(달별/주별 정기 송금일)
    startedDate: "", // 송금 시작일
  });

  // const hasScheduled =
  //   formData.regRemType === "MONTHLY"
  //     ? Number(formData.scheduled) > 0
  //     : formData.regRemType === "WEEKLY"
  //     ? !isScheduledEmpty
  //     : false;

  // 폼 유효성 검사
  const isFormValid =
    formData.accountNo.trim() !== "" &&
    formData.sendAmount.trim() !== "" &&
    formData.regRemType.trim() !== "" &&
    formData.startedDate.trim() !== "" &&
    formData.scheduled !== "";

  // 공통 input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 송금 금액(외화) 변경 핸들러
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

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startedDate: date,
    }));
  };

  // 송금 유형 저장 후 다음 페이지로 이동
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // 콤마 제거 후 숫자로 변환
      const removeAmount = formData.sendAmount.replace(/,/g, "");
      const numericAmount = Number(removeAmount);

      // MONTHLY와 WEEKLY에 따라 scheduledDate와 scheduledDay 분리
      let scheduledDate = null;
      let scheduledDay = null;

      if (formData.regRemType === "MONTHLY" && formData.scheduled) {
        scheduledDate = Number(formData.scheduled); // 숫자로 변환
      }

      if (formData.regRemType === "WEEKLY" && formData.scheduled) {
        scheduledDay = formData.scheduled; // 문자열이기 때문에 그대로 저장
      }

      const submissionData = {
        accountNo: formData.accountNo,
        sendCurrency,
        receiveCurrency,
        sendAmount: numericAmount,
        regRemType: formData.regRemType,
        scheduledDate, // MONTHLY일 때만 값, 나머지는 null
        scheduledDay, // WEEKLY일 때만 값, 나머지는 null
        startedDate: formData.startedDate,
      };

      console.log("작성된 폼: ", submissionData);

      // 정기 해외 송금 신규 등록 요청바디 저장
      dispatch(setTypeData(submissionData));

      router.push("/send/information/remittance");
    } else {
      console.log("모든 입력 칸이 채워져야 됩니다");
    }
  };

  return (
    <main>
      {/* 상단 바 */}
      <AppHeader
        title="해외 송금"
        show={true}
        showHamburger={false}
        showBack={true}
      />

      {/* 프로그레스 바 */}
      <div className="px-5">
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
                <div className="relative w-full">
                  <select
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none ${
                      formData.accountNo === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  >
                    <option value="">계좌를 선택하세요</option>
                    {connectedAccounts.map((account, index) => (
                      <option key={index} value={account}>
                        {account}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                </div>
              </div>

              {/* 송금 통화 코드(원화로 고정) */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  송금 통화 코드
                </label>
                <div className="relative w-full">
                  <input
                    name="sendCurrency"
                    value={sendCurrency}
                    readOnly
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                      formData.sendCurrency === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  ></input>
                </div>
              </div>

              {/* 수취 통화 코드 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  수취 통화 코드
                </label>
                <div className="relative w-full">
                  <input
                    name="receiveCurrency"
                    value={receiveCurrency}
                    readOnly
                    placeholder="수취 통화 코드를 입력하세요(USD, CNY, JPY)"
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none placeholder:text-[#86909C] focus:outline-none ${
                      formData.receiveCurrency === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  ></input>
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
                      formData.regRemType === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  >
                    <option value="">
                      송금 주기를 선택하세요 (매월 / 매주)
                    </option>
                    <option value="MONTHLY">매월</option>
                    <option value="WEEKLY">매주</option>
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
                      formData.scheduled === "" || formData.scheduled === 0
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  >
                    <option value="">송금 주기의 상세 시점을 선택하세요</option>
                    {formData.regRemType === "MONTHLY" &&
                      Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}일
                        </option>
                      ))}
                    {formData.regRemType === "WEEKLY" &&
                      DAYS.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.name}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                </div>

                {/* 송금 주기 상세가 매월일 경우, 매주일 경우 보여지는 경고 문자가 다르게 보여짐 */}
                {formData.scheduled !== "" &&
                  formData.regRemType === "WEEKLY" && (
                    <p className="text-xs mt-1 text-[#F53F3F]">
                      우리은행은 평일에만 송금이 가능하오니 이용에 참고해주세요
                    </p>
                  )}
                {formData.scheduled > 28 &&
                  formData.regRemType === "MONTHLY" && (
                    <p className="text-xs mt-1 text-[#F53F3F]">
                      해당 월에 해당 날짜가 없으면 자동으로 그 달의 마지막 날에
                      실행됩니다
                    </p>
                  )}
              </div>

              {/* 송금 시작일 */}
              <div className="flex flex-col items-start">
                <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                  송금 시작일
                </label>
                <DatePicker
                  value={formData.startedDate}
                  onChange={handleDateChange}
                />
              </div>
            </form>
          </section>
        </section>
      </div>
      <BottomBar label="다음" onClick={handleSubmit} isActive={isFormValid} />
    </main>
  );
}
