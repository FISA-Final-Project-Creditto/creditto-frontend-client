import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CreditScoreBanner({ label, point }) {
  const t = useTranslations("send.components.creditPointBanner");
  return (
    <div className="flex items-center justify-between px-[0.938rem] py-4 border border-[#E5E6EB] rounded-lg">
      <span className="text-sm text-black">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-black">
          {t("expectedCredit")}{" "}
          <span className="text-[#00B42A]">
            {point}
            {t("point")}
          </span>
        </span>
        <ArrowUp className="w-4 h-4 text-[#00B42A]" />
      </div>
    </div>
  );
}
