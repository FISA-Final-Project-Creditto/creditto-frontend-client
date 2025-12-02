"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import api, { issueCertificate, registerUser } from "../../../api/axios";
import { resetVerification } from "@/src/store/features/simplepw/simplepwSlice";
import { useTranslations } from "next-intl";

const SecurePinKeyboard = dynamic(
  () => import("./components/SecurePinKeyboard"),
  { ssr: false } // 키보드는 클라이언트에서만 렌더 → hydration 에러 방지
);

export default function SecurePage({ length = 6 }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("auth.password");

  // 목적지 기반 인증을 위한 새로운 Redux 상태
  const { isVerificationRequired, redirectPath, mode } = useSelector(
    (state) => state.simplepw
  );
  // 비밀번호 '설정' 모드인지 확인
  const isSettingMode = mode === "setting";

  // Redux 스토어에서 serialNumber를 가져옵니다.
  const serialNumber = useSelector((state) => state.user.serialNumber);

  const [pin, setPin] = useState(""); // 현재 입력된 비밀번호 상태
  const [firstPin, setFirstPin] = useState(null); // 1차에 입력한 비밀번호
  const [step, setStep] = useState(1); // 1단계/2단계 체크
  const [isShaking, setIsShaking] = useState(false); // 흔들기 여부
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [shuffleToken, setShuffleToken] = useState(1); // 키보드 섞기 트리거용 토큰

  const hiddenInputRef = useRef(null); // 숨겨진 input (포커스 트랩용)

  const userData = useSelector((state) => state.user); // Redux 스토어에서 userSlice 필드들 가져옴

  // 6자리 완료 시 1차 or 2차 처리
  const emitChange = useCallback(
    async (v) => {
      setPin(v);

      // 아직 6자리가 안 됐으면 아무 처리 안 함
      if (v.length < length) return;

      // 비밀번호 설정 모드일 때만 처리
      if (isSettingMode) {
        // ① 첫 번째 입력 완료
        if (step === 1) {
          setFirstPin(v); // 첫 PIN 저장
          setStep(2); // 두 번째 입력 단계로 전환
          setPin(""); // 입력값 초기화
          setErrorMessage(""); // 에러 메시지 초기화
          setShuffleToken((prev) => prev + 1); // 키패드 셔플
          return;
        }

        // ② 두 번째 입력 단계
        if (step === 2) {
          // 두 번째 입력이 첫 번째 입력과 일치하는 경우
          if (v === firstPin) {
            try {
              const data = {
                userId: userData.userId,
                name: userData.name,
                birthDate: userData.birthDate,
                phoneNo: userData.phoneNumber,
                simplePassword: v,
                isAgreed: true,
              };

              // 인증서 발급 API 호출
              const res = await issueCertificate(data);
              console.log("인증서 발급 결과:", res);

              dispatch(resetVerification()); // 모드 초기화
              router.push("/auth/loading");
            } catch (err) {
              console.error("인증서 발급 실패:", err);
              setPin("");
              setFirstPin(null);
              setStep(1);
              setIsShaking(true);
              setErrorMessage(t("certificateIssueError"));
              setShuffleToken((prev) => prev + 1);
            }
          } else {
            // 두 번째 입력이 첫 번째와 불일치하는 경우
            setPin("");
            setIsShaking(true);
            setFirstPin(null);
            setStep(1);
            setErrorMessage(t("passwordsDoNotMatch"));
            setShuffleToken((prev) => prev + 1);
          }

          return;
        }
      }
    },
    [length, step, firstPin, router, isSettingMode, userData, dispatch, t]
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

  // [리팩토링] 범용 비밀번호 검증 및 리디렉션 로직
  useEffect(() => {
    const verifyAndRedirect = async () => {
      try {
        console.log(serialNumber);
        if (!serialNumber) {
          setErrorMessage(t("certificateNotFound"));
          setIsShaking(true);
          return;
        }

        // 비밀번호 검증을 위한 파라미터 설정
        const params = new URLSearchParams();
        params.append("grant_type", "certificate");
        params.append("certificate_serial", serialNumber);
        params.append("simple_password", pin);
        params.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID);
        params.append("client_secret", process.env.NEXT_PUBLIC_CLIENT_SECRET);

        const response = await api.post("/oauth2/token", params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        // 검증 성공!
        dispatch(resetVerification()); // 사용한 인증 모드 상태 초기화

        // 만약 목적지가 '/main'이면(로그인 시도), 토큰을 세션 스토리지에 저장
        if (redirectPath === "/main") {
          sessionStorage.setItem("accessToken", response.data.access_token);
          sessionStorage.setItem("refreshToken", response.data.refresh_token);
          sessionStorage.setItem("userId", response.data.user_id);
        }

        // 저장된 목적지(redirectPath)로 이동. 없으면 기본값으로 /main
        router.push(redirectPath || "/main");
      } catch (error) {
        console.error("❌ 비밀번호 검증 실패:", error);
        setPin("");
        setIsShaking(true);
        setErrorMessage(t("passwordIncorrectOrError"));
      }
    };

    if (isVerificationRequired && pin.length === length) {
      verifyAndRedirect();
    }
  }, [
    pin,
    isVerificationRequired,
    redirectPath,
    serialNumber,
    length,
    router,
    dispatch,
    t,
  ]);

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
        {isSettingMode && (
          <h1 className="text-[1.375rem] font-medium text-black leading-snug mb-[1.875rem] whitespace-pre-line">
            {t("title1")}
            <br />
            {t("title2")}
          </h1>
        )}
        <div className="flex flex-col items-center ">
          {isVerificationRequired && (
            <p className="text-[#4E5969] mt-6">{t("enter6DigitPin")}</p>
          )}

          {isSettingMode && step === 1 && (
            <p className="text-[#4E5969] mt-6">{t("enter6DigitPinToUse")}</p>
          )}

          {step === 2 && !errorMessage && (
            <p className="text-[#4E5969] text-sm mt-1">
              {t("enterAgainForConfirmation")}
            </p>
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
