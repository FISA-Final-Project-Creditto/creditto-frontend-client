import React from "react";

export default function SendBtn({ title, onClick }) {
  return (
    <button
      className="w-full h-[4.25rem] text-[18px] font-medium border border-[#E5E6EB] rounded-xl bg-transparent"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
