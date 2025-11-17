"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function PhoneCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간(초)

  // 타이머
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRequest = () => {
    // TODO: 서버에 인증번호 요청
    setTimeLeft(180); // 3분
  };

  const handleResend = () => {
    handleRequest();
  };

  const formatTime = () => {
    if (!timeLeft) return "3:00";
    const m = Math.floor(timeLeft / 60);
    const s = String(timeLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (e) => {
    // 숫자만, 최대 6자리
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  const canSubmit = code.length === 6 && timeLeft > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    // TODO: 인증번호 검증 후 다음 페이지로 이동
   
    alert("인증을 성공했어요")
    router.push("/signup/loading");
  };

  return (
  <>
        {/* 상단 내용 */}
        <AppHeader title="문자 인증" show={true} showHamburger={true} />
        <div className="flex-1 px-5 mt-5 pb-10">
   

          <p className="text-[22px] font-semibold leading-relaxed text-gray-900 text-left mb-10">
            문자메시지로 받은
            <br />
            인증번호 6자리를 입력해주세요
          </p>

          {/* 입력 박스 */}
          <div className="w-full border border-gray-300 rounded-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col w-[130px] h-[60px]">
              <label className="text-[10px] text-gray-500 mb-1 text-left">인증번호</label>
              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={handleChange}
                placeholder="000000"
                className="outline-none border-none text-[22px] tracking-[0.3em] text-gray-700 placeholder:text-gray-300"
              />
            </div>

            <div className="flex items-center ">
              <span className="text-sm text-gray-500 w-[44px] text-left text-red-500">
                {formatTime()}
              </span>
              <button
                type="button"
                onClick={handleRequest}
                className="w-[70px] px-3 py-2 cursor-pointer rounded-md bg-[#1A3668] text-white text-[13px] font-medium"
              >
                인증요청
              </button>
            </div>
          </div>

          {/* 재요청 링크 */}
          <button
            type="button"
            onClick={handleResend}
            className="mt-3 text-[13px] text-gray-500 underline ml-auto block cursor-pointer mr-5"
          >
            인증 재요청
          </button>
        </div>

        {/* 하단 버튼 */}
<div className="w-full  h-[128px]  flex justify-center">
   <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
        className={`cursor-poitner w-full h-[60px] text-[22px] font-semibold flex justify-center items-center  rounded-lg
            transition-colors
            ${
              canSubmit
                ? "bg-[#1A3668] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          인증하기
        </button>
        
      </div>
        
       
</>
  );
}
