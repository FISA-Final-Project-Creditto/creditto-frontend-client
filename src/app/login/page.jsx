"use client";
import BottomSheet from "@/src/app/signup/phone/components/BottomSheet";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import axios from "axios";
import { useState } from "react";
import api from "../api/axios";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

const LoginHandle = async () => {
  try {
    const res = await api.get(
      `/api/certificate/serialNumber?username=${encodeURIComponent(
        name
      )}&phoneNo=${phonenumber}`
    );
    console.log("데이터 정보:", res.data);
  } catch (err) {
    console.error("요청 실패:", err);
  }
};

  const NameField = (
    <div className="w-full h-[70px] border border-gray-300 rounded-lg flex flex-col justify-center px-5">
      <label className="text-sm text-gray-600">이름</label>
      <input
        value={name}
        type="text"
        placeholder="이름을 입력하세요"
        className="w-full border-gray-300 focus:outline-none focus:border-[#1A3668] text-[20px] pb-1"
        onChange={(e) => setName(e.target.value)}
        onInput={(e) => {
          // 한글, 영문자, 공백만 허용하고 나머지는 제거합니다.
          const value = e.target.value.replace(
            /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g,
            ""
          );
          e.target.value = value;
          setName(value);
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

          <h1 className="text-[20px] font-bold mb-5">
            본인 인증을 위해
            <br />
            정보를 입력해주세요
          </h1>

          {/* 입력 필드 */}
          {NameField}
          {PhoneField}
        </div>
        <div className="w-30 h-30 bg-red-300" onClick={LoginHandle} />
        로그인
      </div>
    </main>
  );
}
