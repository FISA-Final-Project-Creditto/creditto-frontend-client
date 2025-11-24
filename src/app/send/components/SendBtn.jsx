"use client";

import { ArrowRight, FileText, Plus, Settings } from "lucide-react";

// 아이콘 매핑
const iconMap = {
  plus: Plus,
  file: FileText,
  setting: Settings,
};

// 컴포넌트
export default function SendBtn({ title, subtitle, icon, onClick }) {
  const IconComponent = iconMap[icon]; // icon 문자열 → 실제 컴포넌트

  return (
    <button
      type="button"
      className="group relative flex items-center p-5 bg-white border border-[#E5E6EB] rounded-2xl text-left w-full mb-3 focus-visible:outline-none focus-visible:ring-0"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-[#F0F6FF] text-blue-600 flex items-center justify-center mr-4 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        {IconComponent && <IconComponent className="w-6 h-6" />}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-black text-lg">{title}</h3>
        <p className="text-[#86909C] text-sm mt-0.5">{subtitle}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-[#86909C] group-hover:text-blue-500 transition-colors" />
    </button>
  );
}
