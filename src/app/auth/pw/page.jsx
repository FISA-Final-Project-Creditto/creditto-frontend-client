"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { issueCertificate } from "@/src/app/api/axios";
const SecurePinKeyboard = dynamic(
  () => import("./components/SecurePinKeyboard"),
  { ssr: false } // 키보드는 클라이언트에서만 렌더 → hydration 에러 방지
);

export default function SecurePage({ length = 6, onComplete, onChange }) {
  const [pin, setPin] = useState(""); // 현재 입력된 비밀번호 상태
  const [firstPin, setFirstPin] = useState(null); // 1차에 입력한 비밀번호
  const [step, setStep] = useState(1); // 1단계/2단계 체크
  const [isShaking, setIsShaking] = useState(false); // 흔들기 여부
  const [shuffleToken, setShuffleToken] = useState(1); // 키보드 섞기 트리거용 토큰

  const hiddenInputRef = useRef(null); // 숨겨진 input (포커스 트랩용)
  const router = useRouter();

  const userData = useSelector((state) => state.user); // Redux 스토어에서 userSlice 필드들 가져옴

  // 6자리 완료 시 1차 or 2차 처리
  const emitChange = useCallback(
    async (v) => {
      setPin(v);

      // 아직 6자리가 안 됐으면 업데이트만
      if (v.length < length) return;

      // ① 첫 번째 입력 완료
      if (step === 1) {
        setFirstPin(v); // 첫 PIN 저장
        setStep(2); // 두 번째 입력으로 전환
        setPin(""); // 입력창 초기화

        setShuffleToken((t) => t + 1);
        return;
      }

      // ② 두 번째 입력 완료 → 첫 입력과 비교
      if (step === 2) {
        if (v === firstPin) {
          // 성공
          // 인증서 발급 API 호출
          try {
            const data = {
              externalUserId: userData.externalUserId,
              name: userData.name,
              birthDate: userData.birthDate,
              phoneNo: userData.phoneNumber,
              simplePassword: v,
            };

            const res = await issueCertificate(data);
            // 성공 시
            if (res && res.code === 200) {
              // 1. loadingpage로 이동
              router.push("/auth/loading");
              // console.log("성공");

              // 2. serialNumber를 저장해두기 (httpOnly 쿠키)
              try {
                await fetch("/api/serial_cookie", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ serialNumber: res.data.serialNumber }),
                });
              } catch (cookieError) {
                console.error(
                  "Failed to set serial number cookie:",
                  cookieError
                );
              }
            }
          } catch (error) {
            console.error("Failed to issue certificate:", error);
          }
        } else {
          // 실패 → 리셋
          // ✅ TODO: 에러 메세지가 UI에 표시되도록 개선
          setPin("");
          setIsShaking(true);
          setFirstPin(null);
          setStep(1);
        }

        setShuffleToken((t) => t + 1);
      }
    },
    [
      length,
      step,
      firstPin,
      userData.externalUserId,
      userData.name,
      userData.birthDate,
      userData.phoneNumber,
      router,
    ]
    // [length, step, firstPin]
  );

  // 키보드에서 숫자 버튼 클릭 시 실행
  const onDigit = useCallback(
    (d) => {
      if (pin.length >= length) return;
      emitChange(pin + d);
    },
    [pin, length, emitChange]
  );

  // 마지막 입력 숫자 제거
  const onBackspace = useCallback(() => {
    if (!pin.length) return;
    emitChange(pin.slice(0, -1));
  }, [pin, emitChange]);

  // 전체 입력된 비밀번호 초기화
  const onClear = useCallback(() => {
    emitChange("");
  }, [emitChange]);

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
    if (e.key === "Enter" && pin.length === length) return onComplete?.(pin);
    if (/^[0-9]$/.test(e.key)) return onDigit(e.key);
  };

  return (
    <section
      className="min-h-dvh flex flex-col pt-[6.25rem] pb-[calc(24px+env(safe-area-inset-bottom))] bg-white"
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
        <h1 className="text-[1.375rem] font-medium text-black leading-snug mb-[1.875rem]">
          인증서 로그인을 위한
          <br />
          간편 비밀번호를 설정합니다
        </h1>
        <div className="flex flex-col items-center ">
          <p className="text-[#4E5969] mt-6">6자리 비밀번호를 입력하세요</p>

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
