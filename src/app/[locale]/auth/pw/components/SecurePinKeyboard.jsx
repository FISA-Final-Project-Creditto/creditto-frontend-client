"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

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
  shuffleOnEveryPress = false, // 기본값을 false로 (한 자리마다 섞지 않기)
  onDigit,
  onBackspace,
  onClear,
  shuffleToken, // SecurePage에서 내려주는 토큰
  onRequestShuffle, // “다시 섞어줘”를 부모에게 요청하는 콜백 추가
}) {
  const t = useTranslations("auth.securePinKeyboard");

  // digits를 shuffleToken에 의해 결정되는 파생 상태로 처리 (useState/useEffect 제거)
  const digits = useMemo(() => {
    const base = "0123456789".split("");
    if (shuffleToken == null) return base;
    return shuffle(base);
  }, [shuffleToken]); // shuffleToken이 바뀔 때마다 재계산

  // 숫자 버튼 클릭 시 상위 컴포넌트에 숫자 전달
  // 필요하면 옵션으로 "입력할 때마다 섞기"도 가능하게 유지
  const press = (d) => {
    onDigit?.(d);
    // 부모에게 shuffleToken 갱신을 요청
    if (shuffleOnEveryPress) {
      onRequestShuffle?.(); // 부모에서 shuffleToken을 변경하도록 위임
    }
  };

  return (
    <div
      className="
        bottom-0 left-0 right-0
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
          {t("clearAll")}
        </button>

        {/* 중앙: 마지막 숫자 */}
        <Key key="k-9" label={digits[9]} onClick={() => press(digits[9])} />

        {/* 우하단: 백스페이스 */}
        <button
          onClick={onBackspace}
          aria-label={t("delete")}
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
  const t = useTranslations("auth.securePinKeyboard");
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
      aria-label={t("enterLabel", { label })}
    >
      {label}
    </button>
  );
}
