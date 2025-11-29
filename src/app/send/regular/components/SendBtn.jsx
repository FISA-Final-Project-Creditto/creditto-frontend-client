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
      className="group relative flex items-center p-4 bg-white/10 rounded-2xl text-left w-full border border-white/20 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 mb-2 last:mb-0"
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 transition-colors group-hover:bg-white/20 shrink-0">
        {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white text-lg">{title}</h3>
        <p className="text-white/70 text-sm mt-0.5 whitespace-pre-line">
          {subtitle}
        </p>
      </div>
      <ArrowRight className="w-5 h-5 text-white/50 transition-colors group-hover:text-white ml-2 shrink-0" />
    </button>
  );
}
