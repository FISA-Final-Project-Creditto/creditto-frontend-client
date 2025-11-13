"use client";

export default function BottomBar({ label, onClick }) {
  return (
    <div className="w-full h-[128px] flex justify-center">
      <button
        className="w-[90%] h-[55px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg bg-[#1A3668] text-white"
        onClick={onclick}
      >
        {label}
      </button>
    </div>
  );
}
