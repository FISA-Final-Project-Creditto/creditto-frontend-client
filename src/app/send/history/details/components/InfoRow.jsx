"use client";

// 읽기 전용 필드
export default function InfoRow({ label, value, multiline = false }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-left text-[#86909C] min-w-[100px]">{label}</span>
      <span className="text-right text-[#1D2129] font-medium flex-1 whitespace-pre-line">
        {value}
      </span>
    </div>
  );
}
