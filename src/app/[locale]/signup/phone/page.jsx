"use client";
import BottomSheet from "@/src/app/[locale]/signup/phone/components/BottomSheet";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

export default function PhonePage() {
  const t = useTranslations("signup.phone");
  const router = useRouter();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1); // 1: 이름, 2: 생일, 3: 전화번호
  const [name, setName] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  
  const nameInputRef = useRef(null);
  const birthdayInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  
  useEffect(() => {
    if (step === 1 && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (step === 2 && birthdayInputRef.current) {
      birthdayInputRef.current.focus();
    } else if (step === 3 && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [step]);

  // 상단 문구
  const labelText =
    step === 1
      ? t("nameLabel")
      : step === 2
      ? t("birthdayLabel")
      : t("phoneLabel");

  const NameField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5 focus-within:border-[#1A3668] transition-colors">
      <label className="text-sm text-gray-600">{t("name")}</label>
      <input
        ref={nameInputRef}
        value={name}
        type="text"
        className="w-full focus:outline-none text-[20px] pb-1 bg-transparent"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim() !== "") setStep(2);
        }}
      />
    </div>
  );

  const BirthdayField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5 focus-within:border-[#1A3668] transition-colors">
      <label className="text-sm text-gray-600 ">{t("birthdate")}</label>
      <input
        ref={birthdayInputRef}
        value={birthday}
        type="text"
        placeholder={t("birthdatePlaceholder")}
        className="w-full focus:outline-none text-[20px] pb-1 bg-transparent"
        onChange={(e) => {
          let value = e.target.value.replace(/\D/g, "");
          if (value.length > 8) {
            value = value.slice(0, 8); // 최대 8자리로 제한
          }

          // YYYY-MM-DD 형식
          if (value.length > 6) {
            value = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(
              6
            )}`;
          } else if (value.length > 4) {
            value = `${value.slice(0, 4)}-${value.slice(4)}`;
          }

          setBirthDay(value);
          if (value.length === 10) setStep(3);
        }}
      />
    </div>
  );

  const PhoneField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5 focus-within:border-[#1A3668] transition-colors">
      <label className="text-sm text-gray-600 ">{t("phoneNumber")}</label>
      <input
        ref={phoneInputRef}
        value={phonenumber}
        type="text"
        placeholder={t("phonePlaceholder")}
        className="w-full focus:outline-none text-[20px] pb-1 tracking-wider bg-transparent"
        onChange={(e) => {
          // 1️⃣ 숫자만 남기기
          let value = e.target.value.replace(/[^0-9]/g, "");

          // 2️⃣ 최대 11자리까지만 입력 가능
          if (value.length > 11) value = value.slice(0, 11);

          // 3️⃣ 하이픈 자동 삽입 (010-xxxx-xxxx)
          if (value.length > 7) {
            value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
          } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
          }

          setPhoneNumber(value);
        }}
      />
    </div>
  );

  return (
    <main className="h-[100dvh] flex justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex  flex-col bg-white">
        <AppHeader
          title={t("authTitle")}
          show={true}
          showHamburger={true}
          showBack={true}
        />
        <div className="flex-1 px-8 pt-8 pb-10 text-left space-y-6">
          {/* 상단 문구 */}

          <h1
            key={labelText}
            className="text-[20px] font-bold mb-5 animate-fade-in-up"
          >
            {labelText}
          </h1>

          {/* step에 따라 위에 새 필드를 추가하면서 아래로 밀리는 구조 */}

          {step === 1 && (
            <>
              <div className="animate-fade-in-up">{NameField}</div>
            </>
          )}

          {step === 2 && (
            <>
              {/* 새로 생기는 생일 필드가 위에서 애니메이션으로 등장 */}
              <div className="animate-fade-in-up">{BirthdayField}</div>
              {NameField}
            </>
          )}

          {step === 3 && (
            <>
              {/* 새로 생기는 전화번호 필드가 위에서 애니메이션으로 등장 */}
              <div className="animate-fade-in-up">{PhoneField}</div>
              {BirthdayField}
              {NameField}
            </>
          )}
        </div>
        {step === 3 && (
          <>
            {/* 새로 생기는 전화번호 필드가 위에서 애니메이션으로 등장 */}
            <BottomSheet
              name={name}
              birthday={birthday}
              phoneNumber={phonenumber}
            />
          </>
        )}
      </div>
    </main>
  );
}
