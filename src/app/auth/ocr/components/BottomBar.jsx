"use client";

export default function BottomBar({ label, onClick, isActive = false }) {
  const buttonClasses = `
    w-full h-[55px] text-[22px] bottom-0 mt-10 font-semibold flex justify-center items-center transition-colors rounded-lg
    ${isActive ? "bg-[#1A3668] text-white" : "bg-[#99A6BC] text-white"}
  `;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={!isActive}>
      {label}
    </button>
  );
}
