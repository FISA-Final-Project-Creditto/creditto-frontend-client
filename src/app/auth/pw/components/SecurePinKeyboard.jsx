"use client";

import React, { useState } from "react";

// 0~9 배열을 무작위 순서로 변경
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(
      (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * (i + 1)
    );
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SecurePinKeyboard({
  accentHex = "#1A3668",
  shuffleOnEveryPress = true,
  onDigit,
  onBackspace,
  onClear,
}) {
  // 초기 렌더링 시 0~9 숫자를 무작위로 섞음
  const [digits, setDigits] = useState(() => shuffle("0123456789".split("")));

  // 숫자 버튼 클릭 시 상위 컴포넌트에 숫자 전달
  // 설정값에 따라 매번 키 순서를 재섞음
  const press = (d) => {
    onDigit?.(d);
    if (shuffleOnEveryPress) setDigits((cur) => shuffle(cur));
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        pt-6 pb-[max(24px,env(safe-area-inset-bottom))]
        bg-[var(--accent)]
        [WebkitTapHighlightColor:transparent]
      "
      style={{ "--accent": accentHex }} // 변수 한 번만 지정
    >
      <div className="grid grid-cols-3 gap-3 w-full px-6 select-none">
        {digits.slice(0, 9).map((d, i) => (
          <Key key={`k-${i}`} label={d} onClick={() => press(d)} />
        ))}

        {/* 좌하단: 전체삭제 */}
        <button
          onClick={onClear}
          className="
            h-16 w-full rounded-2xl
            text-white/90 text-base font-medium
            active:opacity-80
            focus:outline-none focus:ring-0
            bg-[var(--accent)]
          "
        >
          전체삭제
        </button>

        {/* 중앙: 마지막 숫자 */}
        <Key key="k-9" label={digits[9]} onClick={() => press(digits[9])} />

        {/* 우하단: 백스페이스 */}
        <button
          onClick={onBackspace}
          aria-label="지우기"
          className="
            h-16 w-full rounded-2xl
            text-white text-2xl font-semibold
            active:opacity-80
            focus:outline-none focus:ring-0
            bg-[var(--accent)]
          "
        >
          ←
        </button>
      </div>
    </div>
  );
}

function Key({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        h-16 w-full rounded-2xl
        text-white text-2xl font-semibold
        active:opacity-80
        focus:outline-none focus:ring-0
        bg-[var(--accent)]
        shadow-none
        [WebkitTapHighlightColor:transparent]
      "
      aria-label={`${label} 입력`}
    >
      {label}
    </button>
  );
}
