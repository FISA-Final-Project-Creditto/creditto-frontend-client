"use client";

export default function StepProgressBar({ current, total }) {
  const percent = (current / total) * 100;

  return (
    <div className="flex items-center justify-between">
      {/* 바 전체 영역 */}
      <div className="w-full mr-3 h-[4px] bg-[#E5E6EB] rounded-full overflow-hidden">
        {/* 채워지는 부분 */}
        <div
          className="h-full bg-[#1A3668] rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* 단계 텍스트 */}
      <span className="text-[0.875rem] font-semibold">
        <span className="text-[#1A3668]">{current}</span>/
        <span className="text-[#C9CDD4]">{total}</span>
      </span>
    </div>
  );
}
