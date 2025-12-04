"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import StepProgressBar from "../../../components/StepProgressbar";
import DatePicker from "./components/DatePicker";
import BottomBar from "../../../components/BottomBar";
import { setTypeData } from "@/src/store/features/send/sendSlice";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { credittoApi } from "@/src/app/api/axios";
import { useTranslations } from "next-intl";

// 국가별 통화 코드
const currency = {
  US: "USD",
  JP: "JPY",
  MY: "MYR",
  TH: "THB",
};

export default function TypePage() {
  const t = useTranslations("send");

  const [preferentialRate, setPreferentialRate] = useState(0); // 우대율

  const router = useRouter();
  const dispatch = useDispatch();

  // 요일
  const DAYS = [
    { name: t("common.dayOfWeek.MONDAY"), value: "MONDAY" },
    { name: t("common.dayOfWeek.TUESDAY"), value: "TUESDAY" },
    { name: t("common.dayOfWeek.WEDNESDAY"), value: "WEDNESDAY" },
    { name: t("common.dayOfWeek.THURSDAY"), value: "THURSDAY" },
    { name: t("common.dayOfWeek.FRIDAY"), value: "FRIDAY" },
  ];

  const selectedCountry = useSelector((state) => state.send.selectedCountry);
  const receiveCurrency = currency[selectedCountry]; // 수취 통화 코드
  const sendCurrency = "KRW"; // 송금 통화

  const [allAccounts, setAllAccounts] = useState([]); // 계좌 목록

  // 송금 유형 정보값 상태 관리
  const [formData, setFormData] = useState({
    accountNo: "", // 송금 계좌
    accountId: 0, // 송금 계좌 아이디
    sendAmount: "", // 외화 거래 금액 (문자열 + 콤마 포맷)
    regRemType: "", // 송금 주기
    scheduled: "", // 송금 주기 상세(날짜 or 요일)
    startedDate: "", // 송금 시작일 (YYYY-MM-DD)
  });

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

    // accountNo 변경 시 accountId도 같이 설정
    if (name === "accountNo") {
      const selectedAccount = allAccounts.find(
        (account) => account.accountNo === value
      );

      setFormData((prevData) => ({
        ...prevData,
        accountNo: value,
        accountId: selectedAccount ? selectedAccount.accountId : "",
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 송금 금액(외화) 변경 핸들러 (숫자만 받게 + 3자리 콤마)
  const handleAmountChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, ""); // 숫자만 남기기

    if (rawValue === "") {
      setFormData((prev) => ({ ...prev, sendAmount: "" }));
      return;
    }

    const formattedValue = new Intl.NumberFormat("ko-KR").format(
      Number(rawValue)
    );
    setFormData((prev) => ({ ...prev, sendAmount: formattedValue }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startedDate: date,
    }));
  };

  // 계좌 목록 조회, select 태그 클릭 시 호출
  const fetchAllAccounts = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) return;

      const res = await credittoApi.get("/api/accounts/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { code, data } = res.data;
      if (code === 200) {
        console.log("모든 계좌 조회 성공: ", data);
        // DEPOSIT인 계좌만 필터링
        const depositAccounts = data.filter(
          (account) => account.accountType === "DEPOSIT"
        );

        setAllAccounts(depositAccounts);
      }
    } catch (error) {
      console.error("모든 계좌 조회 중 오류 발생: ", error);
    }
  }, []);

  // 송금 유형 저장 후 다음 페이지로 이동
  const handleSubmit = (e, accountId) => {
    e.preventDefault();

    if (!isFormValid) {
      console.log("모든 입력 칸이 채워져야 됩니다");
      return;
    }

    // 콤마 제거 후 숫자로 변환
    const removeAmount = formData.sendAmount.replace(/,/g, "");
    const numericAmount = Number(removeAmount);

    // MONTHLY와 WEEKLY에 따라 scheduledDate와 scheduledDay 분리
    let scheduledDate = null;
    let scheduledDay = null;

    if (formData.regRemType === "MONTHLY" && formData.scheduled) {
      scheduledDate = Number(formData.scheduled);
    }

    if (formData.regRemType === "WEEKLY" && formData.scheduled) {
      scheduledDay = formData.scheduled;
    }

    const submissionData = {
      accountNo: formData.accountNo,
      sendCurrency,
      receiveCurrency,
      sendAmount: numericAmount,
      regRemType: formData.regRemType,
      scheduledDate,
      scheduledDay,
      startedDate: formData.startedDate,
    };

    console.log("작성된 폼: ", submissionData);

    dispatch(setTypeData({ ...submissionData, accountId: formData.accountId }));

    router.push("/send/regular/information/remittance");
  };

  // 고객별 우대율 조회 API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!receiveCurrency || !formData.sendAmount.trim()) {
        setPreferentialRate(0);
        return;
      }

      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        const res = await credittoApi.get(
          `/api/exchange/preferential-rate/${userId}/${receiveCurrency}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const { code, data } = res.data;
        if (code === 200) {
          setPreferentialRate(data.preferentialRate);
        }
      } catch (error) {
        console.error("고객별 환전 우대율 조회 오류:", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.sendAmount, receiveCurrency]);

  return (
    <main>
      {/* 상단 바 */}
      <AppHeader
        title={t("common.remittance")}
        show={true}
        showHamburger={false}
        showBack={true}
      />

      {/* 프로그레스 바 */}
      <div className="px-5">
        <StepProgressBar current={1} total={4} />

        <section className="flex flex-col gap-[2.188rem] mt-4">
          <h1 className="text-left text-[1.563rem] font-bold">
            {t("regular.information.title")}
          </h1>

          <hr className="border-t border-[#E5E6EB]" />

          <section className="flex flex-col gap-6">
            <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
              {t("regular.information.type")}
            </h2>

            {/* 입력칸 */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[1.875rem]"
            >
              {/* 송금 계좌 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.account")}
                </label>
                <div className="relative w-full">
                  <select
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleChange}
                    // 클릭/포커스 시 계좌 조회
                    onClick={() => {
                      if (!allAccounts.length) fetchAllAccounts();
                    }}
                    onFocus={() => {
                      if (!allAccounts.length) fetchAllAccounts();
                    }}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                      formData.accountNo === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  >
                    <option value="">{t("common.selectAccount")}</option>
                    {allAccounts.map((account) => (
                      <option key={account.accountId} value={account.accountNo}>
                        {account.accountNo}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                </div>
              </div>

              {/* 송금 통화 코드(원화로 고정) */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.sendCurrency")}
                </label>
                <div className="relative w-full">
                  <input
                    name="sendCurrency"
                    value={sendCurrency}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none text-black"
                  />
                </div>
              </div>

              {/* 수취 통화 코드 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.receiveCurrency")}
                </label>
                <div className="relative w-full">
                  <input
                    name="receiveCurrency"
                    value={receiveCurrency || ""}
                    readOnly
                    placeholder={t(
                      "regular.information.receiveCurrencyPlaceholder"
                    )}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none placeholder:text-[#86909C] focus:outline-none ${
                      receiveCurrency ? "text-black" : "text-[#86909C]"
                    }`}
                  />
                </div>
              </div>

              {/* 외화 거래 금액 */}
              <section className="flex flex-col gap-2">
                <div className="flex flex-col items-start">
                  <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                    {t("regular.information.amount", {
                      currency: receiveCurrency,
                    })}
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.sendAmount}
                    onChange={handleAmountChange}
                    placeholder={t("regular.information.amountPlaceholder")}
                    className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
                  />
                </div>

                {/* 우대율 */}
                {preferentialRate > 0 && (
                  <p className="text-sm text-[#334D79] text-left font-semibold">
                    우대율: {preferentialRate}%
                  </p>
                )}
              </section>

              {/* 송금 주기 */}
              <div className="flex flex-col items-start">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.cycle")}
                </label>
                <div className="relative w-full">
                  <select
                    name="regRemType"
                    value={formData.regRemType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                      formData.regRemType === ""
                        ? "text-[#86909C]"
                        : "text-black"
                    }`}
                  >
                    <option value="">
                      {t("regular.information.cyclePlaceholder")}
                    </option>
                    <option value="MONTHLY">
                      {t("regular.information.monthly")}
                    </option>
                    <option value="WEEKLY">
                      {t("regular.information.weekly")}
                    </option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
                </div>
              </div>

              {/* 송금 주기 상세 */}
              <div className="flex flex-col items-start">
                <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.cycleDetail")}
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
                    <option value="">
                      {t("regular.information.cycleDetailPlaceholder")}
                    </option>
                    {formData.regRemType === "MONTHLY" &&
                      Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                          {t("common.day")}
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

                {formData.scheduled !== "" &&
                  formData.regRemType === "WEEKLY" && (
                    <p className="text-xs mt-1 text-[#F53F3F]">
                      {t("regular.information.weekdayWarning")}
                    </p>
                  )}
                {Number(formData.scheduled) > 28 &&
                  formData.regRemType === "MONTHLY" && (
                    <p className="text-xs mt-1 text-[#F53F3F]">
                      {t("regular.information.monthEndWarning")}
                    </p>
                  )}
              </div>

              {/* 송금 시작일 */}
              <div className="flex flex-col items-start">
                <label className="block text-sm font-semibold text-[#4E5969] mb-[6px]">
                  {t("regular.information.startDate")}
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

      <BottomBar
        label={t("common.next")}
        onClick={handleSubmit}
        isActive={isFormValid}
      />
    </main>
  );
}
