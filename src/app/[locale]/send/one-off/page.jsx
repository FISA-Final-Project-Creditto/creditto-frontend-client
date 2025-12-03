"use client";

import { ChevronDown } from "lucide-react";
import DatePicker from "./components/DatePicker";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipientInfo,
  setSendInfo,
  setReceiveCurrency,
} from "@/src/store/features/send/sendSlice";
import BottomBar from "../components/BottomBar";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { credittoApi } from "../../../api/axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
  JP: "JPY",
  MY: "MYR",
  TH: "THB",
};

export default function TypePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("send");

  // 요일
  const DAYS = [
    { name: t("common.dayOfWeek.MONDAY"), value: "MONDAY" },
    { name: t("common.dayOfWeek.TUESDAY"), value: "TUESDAY" },
    { name: t("common.dayOfWeek.WEDNESDAY"), value: "WEDNESDAY" },
    { name: t("common.dayOfWeek.THURSDAY"), value: "THURSDAY" },
    { name: t("common.dayOfWeek.FRIDAY"), value: "FRIDAY" },
  ];

  const selectedCountry = useSelector((state) => state.send.selectedCountry); // 선택된 국가 가져오기
  const recipientBankInfo = useSelector((state) => state.send.recipientInfo); // 선택된 은행 정보 가져오기

  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fee, setFee] = useState(0);
  const [actualReceivedAmount, setActualReceivedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [totalKrwAmount, setTotalKrwAmount] = useState(0);

  useEffect(() => {
    // 클라이언트 사이드에서만 sessionStorage에 접근합니다.
    const storedAccounts = sessionStorage.getItem("accounts");
    if (storedAccounts) {
      setConnectedAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (selectedCountry) {
        try {
          const response = await credittoApi.get(
            `/api/exchange/${currency[selectedCountry]}`
          );
          setExchangeRate(response.data.data.exchangeRate);
        } catch (error) {
          console.error("환율 정보 조회 실패:", error);
          // 기본 환율 설정 또는 에러 처리
        }
      }
    };
    // fetchExchangeRate();
  }, [selectedCountry]);

  // 송금 유형 정보값 상태 관리
  const [formData, setFormData] = useState({
    senderAccountNO: "", // 나의 계좌 (드롭다운)
    recipientAccountNO: "", // 받는 사람 계좌 (직접 입력)
    recipientName: "", // 받는 사람 이름
    phoneCc: "+82", // 국가 코드
    phoneNo: "", // 전화번호
    receiveCurrency: currency[selectedCountry] || "", // 수취 통화 코드
    targetAmount: "", // 외화 거래 금액
    startDate: "", // 송금 시작일
  });

  // 폼 유효성 검사
  const isFormValid =
    formData.senderAccountNO.trim() !== "" &&
    formData.recipientAccountNO.trim() !== "" &&
    formData.recipientName.trim() !== "" &&
    formData.phoneNo.trim() !== "" &&
    formData.targetAmount.trim() !== "" &&
    formData.startDate.trim() !== "";

  // 공통 input 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 선택된 계좌 찾기
  const selectedAccountDetails = connectedAccounts.find(
    (acc) => acc.accountNo === formData.senderAccountNO
  );

  // 선택된 계좌의 accountId
  const selectedAccountId = selectedAccountDetails?.accountId ?? null;
  console.log("accountId: ", selectedAccountId);

  const handleAmountChange = (e) => {
    setAmountError(""); // 입력 시작 시 에러 메시지 초기화
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, "");
    if (rawValue === "" || Number(rawValue) === 0) {
      setFormData((prev) => ({ ...prev, targetAmount: "" }));
      setFee(0);
      setActualReceivedAmount(0);
      setTotalKrwAmount(0);
      setAmountError("");
      return;
    }
    const numericValue = Number(rawValue);
    // 예상 수수료 (예: 0.5%) 및 실제 수취 금액 계산
    const calculatedFee = numericValue * 0.005;
    const calculatedActualAmount = numericValue - calculatedFee;
    const krwAmount = exchangeRate
      ? (numericValue + calculatedFee) * exchangeRate
      : 0;

    // 잔액 초과 확인
    if (selectedAccountDetails && krwAmount > selectedAccountDetails.balance) {
      setAmountError("최대 금액입니다");

      if (exchangeRate > 0) {
        // 보낼 수 있는 최대 외화 금액을 계산합니다. (수수료 포함)
        const maxTargetAmount =
          selectedAccountDetails.balance / (exchangeRate * 1.005);

        // 계산된 최대 금액으로 상태를 업데이트합니다.
        const maxFee = maxTargetAmount * 0.005;
        const maxActualReceived = maxTargetAmount - maxFee;
        const maxKrwAmount = (maxTargetAmount + maxFee) * exchangeRate;

        setFee(maxFee);
        setActualReceivedAmount(maxActualReceived);
        setTotalKrwAmount(maxKrwAmount);
        setFormData((prev) => ({
          ...prev,
          targetAmount: new Intl.NumberFormat().format(
            Math.floor(maxTargetAmount)
          ),
        }));
      }
      return;
    }

    setFee(calculatedFee);
    setActualReceivedAmount(calculatedActualAmount);
    setTotalKrwAmount(krwAmount);
    const formattedValue = new Intl.NumberFormat().format(numericValue);
    setFormData((prev) => ({ ...prev, targetAmount: formattedValue }));
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

    setFormData({ ...formData, recipientAccountNO: formattedValue });
  };

  // 전화번호 자동 하이픈 생성 함수
  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, "");
    let formattedValue = "";

    // 010-0000-0000 형식
    if (rawValue.length > 0) {
      formattedValue = rawValue.substring(0, 3);
    }
    if (rawValue.length > 3) {
      formattedValue += "-" + rawValue.substring(3, 7);
    }
    if (rawValue.length > 7) {
      formattedValue += "-" + rawValue.substring(7, 11);
    }

    setFormData({ ...formData, phoneNo: formattedValue });
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
      setIsDrawerOpen(true);
    }
  };

  // 송금하기 버튼 실행 함수
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const submissionData = {
        targetAmount: Number(formData.targetAmount.replace(/,/g, "")),
        startDate: formData.startDate.replace(/\./g, "-"),
      };

      // 송금 계좌 선택 여부
      if (!selectedAccountDetails || !selectedAccountId) {
        alert("송금 계좌 정보를 찾을 수 없습니다. 다시 선택해주세요.");
        return;
      }

      // 수취인 데이터
      const recipientData = {
        name: formData.recipientName,
        accountNo: formData.recipientAccountNO.replace(/-/g, ""),
        phoneCc: formData.phoneCc,
        phoneNo: formData.phoneNo.replace(/-/g, ""),
        bankName: recipientBankInfo.bankName,
        bankCode: recipientBankInfo.bankCode,
        country: selectedCountry,
      };

      // 수취 통화 코드 값 저장
      dispatch(setReceiveCurrency(formData.receiveCurrency));

      // 송금 정보(금액, 시작일, 계좌 아이디) 저장
      dispatch(
        setSendInfo({
          ...submissionData,
          accountId: selectedAccountId, // 송금 계좌 아이디 저장
          accountNo: formData.senderAccountNO, // 송금 계좌번호
          sendCurrency: "KRW",
        })
      );

      // 수취인 정보 저장
      dispatch(setRecipientInfo(recipientData));

      console.log("[송금하기 버튼 클릭 시 Redux로 보낸 데이터]", {
        receiveCurrency: formData.receiveCurrency,
        sendInfo: {
          ...submissionData,
          accountId: selectedAccountId,
          accountNo: formData.senderAccountNO,
          sendCurrency: "KRW",
        },
        recipientInfo: recipientData,
      });

      // 계좌 번호 페이지로 이동
      const mode = "send";
      router.push(`/account/create/pw?mode=${mode}`);
    } else {
      console.log(t("oneOff.page.fillAllFields"));
    }
  };

  const isBalanceInsufficient =
    selectedAccountDetails && totalKrwAmount > selectedAccountDetails.balance;

  const isFormValidWithBalance = isFormValid && !isBalanceInsufficient;

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
        {/* <StepProgressBar current={1} total={4} /> */}

        <section className="flex flex-col gap-[2.188rem] mt-4">
          {/* <h1 className="text-left text-[1.563rem] font-bold">
            <span className="text-[#1A3668]">누구 에게</span> 보낼까요?
       
          </h1> */}

          <hr className="border-t border-[#E5E6EB]" />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start ">
              <div className="flex items-center justify-between w-full">
                <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                  송금 계좌
                </label>
                <span className="text-[0.875rem] text-[#4E5969] mb-[6px]">
                  잔액:{" "}
                  {new Intl.NumberFormat("ko-KR").format(
                    selectedAccountDetails ? selectedAccountDetails.balance : 0
                  )}
                  원
                </span>
              </div>
              <div className="relative w-full">
                <select
                  name="senderAccountNO"
                  value={formData.senderAccountNO}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-[#86909C] focus:outline-none ${
                    formData.senderAccountNO === ""
                      ? "text-[#86909C]"
                      : "text-black"
                  }`}
                >
                  <option value="">
                    {t("oneOff.form.accountPlaceholder")}
                  </option>
                  {connectedAccounts.map((account) => (
                    <option key={account.accountId} value={account.accountNo}>
                      {account.accountNo}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] pointer-events-none" />
              </div>
            </div>
            <h2 className="text-left text-[1.563rem] text-[#1A3668] font-bold">
              {t("oneOff.page.title")}
            </h2>

            {/* 입력칸 */}

            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.page.recipientAccount")}
              </label>
              <div className="relative w-full">
                <input
                  name="recipientAccountNO"
                  disabled={false}
                  value={formData.recipientAccountNO}
                  onChange={handleAccountNumberChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                    formData.recipientAccountNO === ""
                      ? "text-[#86909C]"
                      : "text-black"
                  }`}
                ></input>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.page.recipientName")}
              </label>
              <input
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                placeholder={t("oneOff.page.recipientNamePlaceholder")}
                className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.page.recipientPhone")}
              </label>
              <div className="flex w-full gap-2">
                <select
                  name="phoneCc"
                  value={formData.phoneCc}
                  onChange={handleChange}
                  className="w-1/3 px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black focus:outline-none"
                >
                  <option value="+82">한국 (+82)</option>
                  <option value="+1">미국 (+1)</option>
                  <option value="+81">일본 (+81)</option>
                  <option value="+60">말레이시아 (+60)</option>
                  <option value="+66">태국 (+66)</option>
                </select>
                <input
                  name="phoneNo"
                  type="tel"
                  value={formData.phoneNo}
                  onChange={handlePhoneNumberChange}
                  placeholder={t("oneOff.page.phonePlaceholder")}
                  className={`w-2/3 px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                    formData.phoneNo === "" ? "text-[#86909C]" : "text-black"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.page.date")}
              </label>
              <DatePicker
                value={formData.startDate}
                onChange={handleDateChange}
              />
              {/* 수취 통화 코드 */}
            </div>
            <div className=" flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.form.receiveCurrency")}
              </label>
              <div className="relative w-full">
                <input
                  name="receiveCurrency"
                  disabled={true}
                  value={formData.receiveCurrency}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none focus:outline-none ${
                    formData.receiveCurrency === ""
                      ? "text-[#86909C]"
                      : "text-black"
                  }`}
                ></input>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.form.amount")}
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formData.targetAmount}
                onChange={handleAmountChange}
                placeholder={t("oneOff.form.amountPlaceholder")}
                className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-none appearance-none text-black placeholder:text-[#86909C] focus:outline-none"
              />
              {amountError && (
                <p className="mt-1 text-sm text-red-500">{amountError}</p>
              )}
              {formData.targetAmount && (
                <div className="mt-2 w-full text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>예상 수수료:</span>
                    <span>
                      {new Intl.NumberFormat().format(fee.toFixed(2))}{" "}
                      {formData.receiveCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>실제 수취 금액:</span>
                    <span>
                      {new Intl.NumberFormat().format(
                        actualReceivedAmount.toFixed(2)
                      )}{" "}
                      {formData.receiveCurrency}
                    </span>
                  </div>
                </div>
              )}
              {exchangeRate && formData.targetAmount && (
                <div className="mt-2 w-full text-sm space-y-1">
                  <div
                    className={`flex justify-between ${
                      isBalanceInsufficient ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    <span>총 출금 예상 금액:</span>
                    <span className="font-semibold">
                      {new Intl.NumberFormat("ko-KR").format(
                        totalKrwAmount.toFixed(0)
                      )}{" "}
                      원
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <BottomBar
            label="다음"
            onClick={handleSubmit} // isFormValidWithBalance를 사용하도록 수정할 수 있습니다.
            isActive={isFormValidWithBalance}
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>입력하신 정보가 맞나요?</DrawerTitle>
            <DrawerDescription>
              입력하신 정보로 송금을 진행합니다.
            </DrawerDescription>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">보내는 계좌</span>
                <span className="font-medium">{formData.senderAccountNO}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">받는 분</span>
                <span className="font-medium">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">받는 분 계좌</span>
                <span className="font-medium">
                  {recipientBankInfo.bankName} {formData.recipientAccountNO}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">송금 날짜</span>
                <span className="font-medium">{formData.startDate}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span className="text-gray-500">송금 금액</span>
                <span className="font-medium">
                  {formData.targetAmount} {formData.receiveCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">원화 환산 금액</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("ko-KR").format(
                    totalKrwAmount.toFixed(0)
                  )}{" "}
                  원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">예상 수수료</span>
                <span className="font-medium">
                  {new Intl.NumberFormat().format(fee.toFixed(2))}{" "}
                  {formData.receiveCurrency}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-gray-800">실제 수취 금액</span>
                <span className="text-lg text-black">
                  {new Intl.NumberFormat().format(
                    actualReceivedAmount.toFixed(2)
                  )}{" "}
                  {formData.receiveCurrency}
                </span>
              </div>
            </div>
          </DrawerHeader>

          <DrawerFooter>
            <Button onClick={handleFinalSubmit}>송금하기</Button>
            <DrawerClose asChild>
              <Button variant="outline">아니요, 수정할게요</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
