"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { resetVerification } from "@/src/store/features/simplepw/simplepwSlice";
import { useTranslations } from "next-intl";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../../../send/components/BottomBar";

// 보안 키보드 컴포넌트를 동적으로 가져옵니다. 서버 사이드 렌더링을 비활성화합니다.
const SecurePinKeyboard = dynamic(
  () => import("../components/SecurePinKeyboard"),
  { ssr: false } // 키보드는 클라이언트에서만 렌더링되어야 하므로 SSR을 비활성화합니다.
);

export default function SecurePage({ length = 4 }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("auth.password"); // 다국어 번역 함수

  const searchParams = useSearchParams(); // URL 쿼리 파라미터를 가져옵니다.
  const accountName = searchParams.get("accountName"); // 'accountName' 쿼리 파라미터를 가져옵니다.
  const accountType = searchParams.get("accountType"); // 'accountType' 쿼리 파라미터를 가져옵니다.

  // 계좌 이름과 종류가 잘 전달되었는지 콘솔에 출력하여 확인합니다.
  useEffect(() => {
    console.log("계좌 이름:", accountName);
    console.log("계좌 종류:", accountType);
  }, [accountName, accountType]);

  const [pin, setPin] = useState(""); // 현재 입력된 비밀번호를 저장하는 상태
  const [firstPin, setFirstPin] = useState(null); // 첫 번째 단계에서 입력한 비밀번호를 저장하는 상태
  const [step, setStep] = useState(1); // 현재 단계를 저장하는 상태 (1: 첫 번째 입력, 2: 확인 입력)
  const [isShaking, setIsShaking] = useState(false); // 비밀번호 불일치 시 흔들림 애니메이션을 위한 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지를 저장하는 상태
  const [shuffleToken, setShuffleToken] = useState(1); // 키보드를 다시 섞기 위한 토큰
  const [isSuccess, setIsSuccess] = useState(false); // 계좌 생성 성공 여부를 저장하는 상태

  const hiddenInputRef = useRef(null); // 물리적 키보드 입력을 위한 숨겨진 입력 필드 참조

  // 비밀번호 입력이 완료될 때 호출되는 함수
  const emitChange = useCallback(
    async (v) => {
      if (v.length < length) return; // 비밀번호가 4자리가 아니면 아무것도 하지 않음

      // --- 1단계: 첫 번째 비밀번호 입력 ---
      if (step === 1) {
        setFirstPin(v); // 첫 번째 입력된 비밀번호 저장
        setStep(2); // 다음 단계(확인)로 이동
        setPin(""); // 현재 입력된 비밀번호 초기화
        setErrorMessage(""); // 에러 메시지 초기화
        setShuffleToken((prev) => prev + 1); // 보안을 위해 키패드 다시 섞기
        return;
      }

      // --- 2단계: 비밀번호 확인 입력 ---
      if (step === 2) {
        // --- 비밀번호 일치 ---
        if (v === firstPin) {
          // 여기에 실제 계좌 생성 API 호출 로직이 들어갑니다.
          // 현재는 성공 상태만 변경하여 UI에 성공 메시지를 표시합니다.
          console.log("계좌 생성 성공!");
          console.log("계좌 이름:", accountName);
          console.log("계좌 종류:", accountType);
          console.log("비밀번호:", v);
          setIsSuccess(true); // 성공 상태로 변경
        }
        // --- 비밀번호 불일치 ---
        else {
          setPin(""); // 현재 입력된 비밀번호 초기화
          setIsShaking(true); // 흔들림 애니메이션 활성화
          setFirstPin(null); // 첫 번째 입력된 비밀번호 초기화
          setStep(1); // 다시 첫 번째 단계로 이동
          setErrorMessage(t("passwordsDoNotMatch")); // "비밀번호가 일치하지 않습니다" 메시지 표시
          setShuffleToken((prev) => prev + 1); // 보안을 위해 키패드 다시 섞기
        }
      }
    },
    [length, step, firstPin, t, accountName, accountType]
  );

  // 키보드에서 숫자 버튼 클릭 시 호출되는 함수
  const onDigit = useCallback(
    (d) => {
      if (pin.length >= length) return; // 4자리를 초과하여 입력할 수 없음
      if (errorMessage) setErrorMessage(""); // 숫자 입력 시 에러 메시지 제거
      setPin(pin + d); // 입력된 숫자를 pin 상태에 추가
    },
    [pin, length, errorMessage]
  );

  // 마지막 입력 숫자 제거 (백스페이스)
  const onBackspace = useCallback(() => {
    if (!pin.length) return;
    setPin(pin.slice(0, -1));
  }, [pin]);

  // 전체 입력된 비밀번호 초기화
  const onClear = useCallback(() => {
    setPin("");
  }, []);

  // pin 상태가 변경될 때마다 emitChange 함수 호출
  useEffect(() => {
    const handleEmitChange = () => {
      emitChange(pin);
    };

    handleEmitChange();
  }, [pin, emitChange]);

  // 물리적 키보드 입력 처리
  const onPhysicalKey = (e) => {
    e.preventDefault();
    if (e.key === "Backspace") return onBackspace();
    if (/^[0-9]$/.test(e.key)) return onDigit(e.key);
  };

  // 성공 화면
  if (isSuccess) {
    return (
      <>
        <AppHeader title="계좌 생성 완료" show={true} />
        <section className="min-h-dvh flex flex-col justify-center items-center text-center p-8 bg-white">
          <h1 className="text-2xl font-bold mb-4">
            계좌 생성이 완료되었습니다.
          </h1>
          <div className="text-lg">
            <p>
              <strong>계좌 이름:</strong> {accountName}
            </p>
            <p>
              <strong>계좌 종류:</strong> {accountType}
            </p>
          </div>
          <div className="w-full mt-10">
            <BottomBar
              label="확인"
              isActive={true}
              onClick={() => router.push("/main")} // 메인 페이지로 이동
            />
          </div>
        </section>
      </>
    );
  }

  // 비밀번호 입력 화면
  return (
    <>
      <AppHeader title="계좌 비밀번호 설정" show={true} showBack={true} />
      <section
        className="min-h-dvh flex flex-col pt-[6.25rem] bg-white"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* 숨겨진 입력 필드 (물리적 키보드 포커스용) */}
        <input
          ref={hiddenInputRef}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="sr-only"
          onKeyDown={onPhysicalKey}
          aria-hidden
        />

        {/* 상단: 타이틀/서브타이틀/인디케이터 */}
        <div>
          <h1 className="text-[1.375rem] font-medium text-black leading-snug mb-[1.875rem] whitespace-pre-line text-center">
            {step === 1
              ? "계좌 생성을 위한\n비밀번호 4자리를 설정합니다"
              : "비밀번호를\n한 번 더 입력해주세요"}
          </h1>

          <div className="flex flex-col items-center ">
            {errorMessage ? (
              <p className="text-[#F53F3F] text-sm mt-1">{errorMessage}</p>
            ) : (
              <p className="text-[#4E5969] text-sm mt-1 h-5">
                {step === 2 && "확인을 위해 다시 입력해주세요."}
              </p>
            )}

            {/* PIN 인디케이터 */}
            <div
              className="mt-6 flex items-center gap-3"
              onClick={() => hiddenInputRef.current?.focus()}
              role="group"
              aria-label="비밀번호 자리수"
              onAnimationEnd={() => setIsShaking(false)} // 애니메이션 끝나면 흔들기 상태 해제
            >
              {Array.from({ length }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    "w-3 h-3 rounded-full border transition-all",
                    i < pin.length
                      ? "bg-[#1a2f5a] border-[#1a2f5a]"
                      : "border-[#C9CDD2] bg-transparent",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex-1"
          onClick={() => hiddenInputRef.current?.focus()}
        />
        {/* 하단: 키패드 */}
        <SecurePinKeyboard
          accentHex="#1a2f5a"
          onDigit={onDigit}
          onBackspace={onBackspace}
          onClear={onClear}
          shuffleToken={shuffleToken}
        />
      </section>
    </>
  );
}
