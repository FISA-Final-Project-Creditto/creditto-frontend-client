"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import api, { issueCertificate } from "../../api/axios";

const SecurePinKeyboard = dynamic(
  () => import("./components/SecurePinKeyboard"),
  { ssr: false } // 키보드는 클라이언트에서만 렌더 → hydration 에러 방지
);

export default function SecurePage({ length = 6 }) { // serialNumber prop 제거
  
  const settingMode = useSelector((state) => state.simplepw.settingMode);
  const loginMode = useSelector((state) => state.simplepw.loginMode);
  console.log("settingMode", settingMode)
  console.log("loginMode",loginMode)
  // Redux 스토어에서 serialNumber를 가져옵니다.
  const serialNumber = useSelector((state) => state.user.serialNumber);

  const [pin, setPin] = useState(""); // 현재 입력된 비밀번호 상태
  const [firstPin, setFirstPin] = useState(null); // 1차에 입력한 비밀번호
  const [step, setStep] = useState(1); // 1단계/2단계 체크
  const [isShaking, setIsShaking] = useState(false); // 흔들기 여부
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [shuffleToken, setShuffleToken] = useState(1); // 키보드 섞기 트리거용 토큰

  const hiddenInputRef = useRef(null); // 숨겨진 input (포커스 트랩용)
  const router = useRouter();

  const userData = useSelector((state) => state.user); // Redux 스토어에서 userSlice 필드들 가져옴

  // 6자리 완료 시 1차 or 2차 처리
  const emitChange = useCallback(
    async(v) => {
      setPin(v);

      // 아직 6자리가 안 됐으면 업데이트만
      if (v.length < length) return;

      // [분기] 비밀번호 설정 모드
      if (settingMode) {
        // ① 첫 번째 입력 완료
        if (step === 1) {
          setFirstPin(v); // 첫 PIN 저장
          setStep(2); // 두 번째 입력으로 전환
          setPin(""); // 입력창 초기화
          setErrorMessage(""); // 에러 메시지 초기화
          setShuffleToken((t) => t + 1);
          return;
        }

   // ② 두 번째 입력 완료 → 첫 입력과 비교
      if (step === 2) {
        if (v === firstPin) {
          // 성공
          // 인증서 발급 API 호출

          // 실패 → 리셋
          // ✅ TODO: 에러 메세지가 UI에 표시되도록 개선
          setPin("");
          setIsShaking(true);
          setFirstPin(null);
          setStep(1);
        }

        setShuffleToken((t) => t + 1);
      router.push("/auth/loading")
      }
      }
    },
    [length, step, firstPin, router, settingMode]
  );

  // 키보드에서 숫자 버튼 클릭 시 실행
  const onDigit = useCallback(
    (d) => {
      if (pin.length >= length) return;
      if (errorMessage) setErrorMessage(""); // 숫자 입력 시 에러 메시지 제거
      setPin(pin + d);
    },
    [pin, length, errorMessage]
  );

  // 마지막 입력 숫자 제거
  const onBackspace = useCallback(() => {
    if (!pin.length) return;
    setPin(pin.slice(0, -1));
  }, [pin]);

  // 전체 입력된 비밀번호 초기화
  const onClear = useCallback(() => {
    setPin("");
  }, []);

  // pin 상태가 변경될 때마다 emitChange 호출
  useEffect(() => {
    emitChange(pin);
  }, [pin, emitChange]);

  // 로그인 모드에서 PIN 6자리가 입력되면 로그인 시도
  useEffect(() => {
    const attemptLogin = async () => {
      try {
             console.log("시리얼 넘버", serialNumber)
        console.log("🔵 [로그인] 입력된 비밀번호로 로그인 시도:", pin);
        if (!serialNumber) {
          setErrorMessage("인증서 정보를 찾을 수 없습니다.");
          setIsShaking(true);
          return;
        }
   

        const params = new URLSearchParams();
        params.append("grant_type", "certificate");
        params.append("certificate_serial", serialNumber);
        params.append("simple_password", pin);
        params.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID);
        params.append("client_secret", process.env.NEXT_PUBLIC_CLIENT_SECRET);
        
        // params에 담긴 값들을 문자열 형태로 확인합니다.
        console.log("🚀 전송될 파라미터:", params.toString());

        const response = await api.post("/oauth2/token", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response.data) {
          console.log("무슨 데이타?",response.data);
          sessionStorage.setItem("accessToken", response.data.access_token);
          sessionStorage.setItem("refreshToken", response.data.refresh_token);
          router.push("/main"); // 성공 시 메인 페이지로 이동
        }
        // api.post에서 4xx, 5xx 에러는 catch 블록으로 빠짐
      } catch (error) {
        console.error("❌ [로그인] 요청 실패 또는 비밀번호 불일치:", error);
        setPin("");
        setIsShaking(true);
        setErrorMessage("비밀번호가 올바르지 않거나 오류가 발생했습니다.");
      }
    };

    // 로그인 모드이고, pin이 6자리가 되었을 때만 실행
    if (loginMode && pin.length === length) {
      attemptLogin();
    }
  }, [pin, length, loginMode, router, serialNumber]); // 의존성 배열에 serialNumber 추가

  // 붙여넣기/복사/자르기 차단
  useEffect(() => {
    const el = hiddenInputRef.current;
    if (!el) return;
    const block = (e) => e.preventDefault();
    el.addEventListener("paste", block);
    el.addEventListener("copy", block);
    el.addEventListener("cut", block);
    return () => {
      el.removeEventListener("paste", block);
      el.removeEventListener("copy", block);
      el.removeEventListener("cut", block);
    };
  }, []);

  // 물리 키보드 입력 처리 (숫자/백스페이스/엔터)
  const onPhysicalKey = (e) => {
    e.preventDefault();
    if (e.key === "Backspace") return onBackspace();    
    if (/^[0-9]$/.test(e.key)) return onDigit(e.key);
  };

  return (
    <section
      className="min-h-dvh flex flex-col pt-[6.25rem]  bg-white"
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {/* 숨겨진 입력(포커스 트랩) */}
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
        {settingMode && (
          <h1 className="text-[1.375rem] font-medium text-black leading-snug mb-[1.875rem]">
            인증서 로그인을 위한
            <br />
            간편 비밀번호를 설정합니다
          </h1>
        )}
        <div className="flex flex-col items-center ">
          {loginMode && (
            <p className="text-[#4E5969] mt-6">
              간편 비밀번호 6자리를 입력하세요
            </p>
          )}
          {settingMode && step === 1 && (
            <p className="text-[#4E5969] mt-6">
              사용할 간편 비밀번호 6자리를 입력하세요
            </p>
          )}

          {step === 2 && !errorMessage && (
            <p className="text-[#4E5969] text-sm mt-1">확인을 위해 한번 더 입력해주세요.</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
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

      <div className="flex-1" onClick={() => hiddenInputRef.current?.focus()} />
      {/* 하단: 키패드 */}
      <SecurePinKeyboard
        accentHex="#1a2f5a"
        onDigit={onDigit}
        onBackspace={onBackspace}
        onClear={onClear}
        shuffleToken={shuffleToken}
      />
    </section>
  );
}
