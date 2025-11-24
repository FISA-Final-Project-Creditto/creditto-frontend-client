"use client";

export default function BottomBar({ label, onClick, isActive = false }) {
  const buttonClasses = `
    w-full h-[55px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg
    ${isActive ? "bg-[#1A3668] text-white" : "bg-[#99A6BC] text-white"}
  `;

  return (
    <div className="w-full px-5 h-[128px] flex justify-center mt-8">
      <button type="submit" className={buttonClasses} onClick={onClick} disabled={!isActive}>
        {label}
      </button>
    </div>
  );
}
2;
