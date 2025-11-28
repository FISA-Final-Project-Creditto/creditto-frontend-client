"use client";

import React, { useState } from "react";

const DEFAULT_COUNTRIES = [
  { code: "US", flag: "🇺🇸", name: "USA", currency: "($)" },
  { code: "MX", flag: "🇲🇽", name: "Mexico", currency: "($)" },
  { code: "DE", flag: "🇩🇪", name: "Germany", currency: "(€)" },
  { code: "NO", flag: "🇳🇴", name: "Norway", currency: "(kr)" },
  { code: "CN", flag: "🇨🇳", name: "China", currency: "(¥)" },
  { code: "SG", flag: "🇸🇬", name: "Singapore", currency: "($)" },
];

export default function PassportCountryGrid({ countries, columns = 3, onSelect, onPassportChange, onConfirm }) {
  const list = countries && countries.length ? countries : DEFAULT_COUNTRIES;
  const [selected, setSelected] = useState(null);
  const [passport, setPassport] = useState("");

  const colsClass = columns === 4 ? "grid-cols-4" : columns === 2 ? "grid-cols-2" : "grid-cols-3";

  const handleSelect = (c) => {
    setSelected(c.code);
    if (onSelect) onSelect(c);
  };

  return (
    <div className="px-4 pb-6">


      {/* 여권번호 입력 필드 */}
      <div className="mb-3">
        <input
          type="text"
          inputMode="text"
          value={passport}
          onChange={(e) => {
            const v = e.target.value;
            setPassport(v);
            if (onPassportChange) onPassportChange(v);
          }}
          maxLength={24}
          placeholder="여권번호를 입력하세요"
          aria-label="여권번호 입력"
          className="w-full px-3 py-3 border-b border-gray-200 bg-white placeholder-gray-400 text-gray-900"
        />
      </div>

      <div className={`grid ${colsClass} gap-4`}>
        {list.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => handleSelect(c)}
            className={`flex flex-col items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition text-left ${
              selected === c.code ? "ring-2 ring-[#1A3668]" : ""
            }`}
          >
            <div className="w-full h-20 flex items-center justify-center bg-white rounded-md mb-3">
              <span className="text-3xl">{c.flag}</span>
            </div>

            <div className="w-full text-center">
              <div className="text-sm font-medium text-gray-900">{c.name}</div>
              <div className="text-xs text-gray-500">{c.currency}</div>
            </div>
          </button>
        ))}
      </div>

      {/* 하단 CTA 버튼: 여권번호 입력값이 있고 국가가 선택되어야 활성화 */}
      <div className="mt-21 px-1">
        <button
          type="button"
          disabled={!(passport && selected)}
          onClick={() => {
            if (!passport || !selected) return;
            const country = list.find((l) => l.code === selected);
            if (onConfirm) onConfirm({ country, passport });
          }}
          className={`w-full max-w-[440px] h-[60px] text-[22px] font-semibold flex items-center justify-center rounded-lg mx-auto transition-colors
            ${passport && selected ? "bg-[#1A3668] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          해외계좌 조회하기
        </button>
      </div>
    </div>
  );
}
