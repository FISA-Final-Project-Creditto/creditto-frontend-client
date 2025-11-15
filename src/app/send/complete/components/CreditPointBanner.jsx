import { ArrowUp } from "lucide-react";

export default function CreditScoreBanner({ label, point }) {
  return (
    <div className="flex items-center justify-between px-[0.938rem] py-4 border border-[#E5E6EB] rounded-lg">
      <span className="text-sm text-black">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-black">
          예상 신용도 <span className="text-[#00B42A]">{point}점</span>
        </span>
        <ArrowUp className="w-4 h-4 text-[#00B42A]" />
      </div>
    </div>
  );
}
