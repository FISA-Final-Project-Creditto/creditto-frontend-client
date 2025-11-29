"use client";
import BottomSheet from "@/src/app/[locale]/signup/phone/components/BottomSheet";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PhonePage() {
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: 이름, 2: 생일, 3: 전화번호
  const [name, setName] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  function handleOnInput(el, maxlength) {
    if (el.value.length > maxlength) {
      el.value = el.value.substr(0, maxlength);
    }
  }
  // 이름 입력 → 1초 후 step 2
  useEffect(() => {
    if (name.trim() !== "" && step === 1) {
      const t = setTimeout(() => setStep(2), 1000);
      return () => clearTimeout(t);
    }
  }, [name, step]);

  // 생일 입력 → 1초 후 step 3
  useEffect(() => {
    if (birthday.trim() !== "" && step === 2) {
      const t = setTimeout(() => setStep(3), 1000);
      return () => clearTimeout(t);
    }
  }, [birthday, step]);

  // 상단 문구
  const labelText =
    step === 1
      ? "고객님의 이름을 알려주세요"
      : step === 2
      ? "고객님의 생일을 알려주세요"
      : "고객님의 전화번호를 입력해주세요";

  const NameField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600">이름</label>
      <input
        value={name}
        type="text"
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );

  const BirthdayField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600 ">생년월일</label>
      <input
        value={birthday}
        type="text"
        placeholder="YYYY-MM-DD"
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1"
        onChange={(e) => setBirthDay(e.target.value)}
        onInput={(e) => {
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

          e.target.value = value;
          setBirthDay(value);
        }}
      />
    </div>
  );

  const PhoneField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600 ">휴대폰 번호</label>
      <input
        value={phonenumber}
        type="text"
        placeholder="010-0000-0000"
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1 tracking-wider"
        onInput={(e) => {
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

          e.target.value = value;
          setPhoneNumber(value);
        }}
      />
    </div>
  );

  return (
    <main className="h-[100dvh] flex justify-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-[100dvh] mx-auto flex  flex-col bg-white">
        <AppHeader
          title="본인 인증"
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
