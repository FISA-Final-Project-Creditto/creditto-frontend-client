"use client";

export default function BottomBar({ label, onClick }) {
  return (
    <div
      className="
        fixed inset-x-0 bottom-0 z-50
        pb-[max(16px,env(safe-area-inset-bottom))]  /* iPhone 안전영역 */
      "
    >
      <button
        onClick={onClick}
        className="
          w-screen h-[4.688rem]
          rounded-3xl
          rounded-none
          bg-[#1A3668] text-white text-[1.125rem] font-semibold
          active:opacity-90
        "
      >
        {label}
      </button>
    </div>
  );
}
