"use client";

import { ChevronDown } from "lucide-react";
import DatePicker from "./components/DatePicker";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipientInfo,
  setReceivedCurrency,
  setSendInfo,
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

  useEffect(() => {
    // 클라이언트 사이드에서만 sessionStorage에 접근합니다.
    const storedAccounts = sessionStorage.getItem("accounts");
    if (storedAccounts) {
      setConnectedAccounts(JSON.parse(storedAccounts));
    }
  }, []);
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

  const handleAmountChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, "");
    if (rawValue === "" || Number(rawValue) === 0) {
      setFormData({ ...formData, targetAmount: "" });
      return;
    }
    const formattedValue = new Intl.NumberFormat().format(Number(rawValue));
    setFormData({ ...formData, targetAmount: formattedValue });
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
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const submissionData = {
        targetAmount: Number(formData.targetAmount.replace(/,/g, "")),
        startDate: formData.startDate.replace(/\./g, "-"),
      };
      const recipientData = {
        name: formData.recipientName,
        accountNo: formData.recipientAccountNO.replace(/-/g, ""),
        phoneCc: formData.phoneCc,
        phoneNo: formData.phoneNo.replace(/-/g, ""),
        bankName: recipientBankInfo.bankName,
        bankCode: recipientBankInfo.bankCode,
        country: selectedCountry,
      };

      // 선택된 계좌번호(senderAccountNO)를 기반으로 accountId를 찾습니다.
      const selectedAccount = connectedAccounts.find(
        (acc) => acc.accountNo === formData.senderAccountNO
      );
      const accountId = selectedAccount ? selectedAccount.accountId : null;

      // 수취 통화 코드 값 저장
      dispatch(setReceivedCurrency(formData.receiveCurrency));
      // 송금 정보(금액, 시작일) 저장
      dispatch(setSendInfo(submissionData));
      // 수취인 정보 저장
      dispatch(setRecipientInfo(recipientData));

      // API 요청 형식에 맞게 데이터 구조화
      const requestData = {
        accountNo: formData.senderAccountNO,
        recipientInfo: {
          ...recipientData,
          receiveCurrency: formData.receiveCurrency,
        },
        recurId: null,
        startDate: submissionData.startDate,
        sendCurrency: "KRW", // 송금 통화는 원화(KRW)로 고정
        targetAmount: submissionData.targetAmount,
      };

      console.log("전송 준비 데이터:", { accountId, ...requestData });

      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const res = await credittoApi.post(`/api/remittance/once`, requestData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("전송 반응:", res.data);
        // 성공 후 페이지 이동 또는 다른 처리
        setIsDrawerOpen(false);
      } catch (error) {
        console.error(t("oneOff.page.requestFailed"), error);
        alert(t("oneOff.page.requestError"));
      }
    } else {
      console.log(t("oneOff.page.fillAllFields"));
    }
  };

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
            <div className="flex flex-col items-start">
              <label className="block text-[0.875rem] font-semibold text-[#4E5969] mb-[6px]">
                {t("oneOff.form.account")}
              </label>
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
                  <option value="">{t("oneOff.form.accountPlaceholder")}</option>
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
                  <option value="+82">{t("oneOff.page.countryCodeKorea")}</option>
                  <option value="+1">{t("oneOff.page.countryCodeUSA")}</option>
                  <option value="+86">{t("oneOff.page.countryCodeChina")}</option>
                  <option value="+81">{t("oneOff.page.countryCodeJapan")}</option>
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
            </div>
          </div>
        </section>
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <BottomBar label="다음" onClick={handleSubmit} isActive={isFormValid} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>입력하신 정보가 맞나요?</DrawerTitle>
            <DrawerDescription>
              입력하신 정보로 송금을 진행합니다.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleFinalSubmit}>네, 맞아요</Button>
            <DrawerClose asChild>
              <Button variant="outline">아니요, 수정할게요</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
