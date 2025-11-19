"use client";

import { Info } from "lucide-react";

export default function Term({ content }) {
  return (
    <section className="flex flex-col items-start mb-6 gap-[0.938rem]">
      <div className="flex items-center gap-[5px]">
        <Info className="w-5 h-5 text-[#4E5969]" />
        <h4 className="text-lg font-bold text-[#4E5969]">유의사항</h4>
      </div>
      <p className="text-xs text-[#86909C] text-left leading-relaxed">
        해외 SWIFT 송금시 입력하신 정보가 콜팬던트 정을 경우 해외 송금이
        정상적으로 처리되지 않을 수 있습니다. 이때에는 착오 고객에게 있으며
        착오사항을 약관사항을 약관사항을 약관사항을 약관사항을 약관사항을
        약관사항을 약관사항을 약관사항을 약관사항을 약관사항을 약관
      </p>
    </section>
  );
}
