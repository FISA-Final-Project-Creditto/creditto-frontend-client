"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SecurePinKeyboard from "./components/SecurePinKeyboard";

export default function SecurePage({ length = 6, onComplete, onChange }) {
  const [pin, setPin] = useState(""); // 현재 입력된 비밀번호 상태
  const hiddenInputRef = useRef(null); // 숨겨진 input (포커스 트랩용)
  const router = useRouter();

  const emitChange = useCallback(
    (v) => {
      setPin(v);
      onChange?.(v);
      if (v.length === length) {
        onComplete?.(v);
        router.push("/auth/loading"); // ✅ 6자리 입력 완료 시 이동
      }
    },
    [length, onChange, onComplete, router]
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
      />
    </section>
  );
}
