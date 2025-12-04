"use client";
import { useTranslations } from "next-intl";

export default function InfoInput({
  title,
  inputMode,
  value,
  onChange,
  prefix,
}) {
  const t = useTranslations("auth.infoInput");
  // 타이틀별 placeholder 문구
  const placeholders = {
    "이름": t("namePlaceholder"),
    "생년월일": t("birthdatePlaceholder"),
    "외국인등록번호": t("alienRegistrationNumberPlaceholder"),
    "주소": t("addressPlaceholder"),
    "체류지역": t("areaOfResidencePlaceholder"),
    "전화번호": "010-0000-0000", // This one should probably be handled differently
  };

  return (
    <div className="flex flex-col items-start gap-[0.938rem] bg-white border border-[#86909C] rounded-xl px-[1.563rem] py-[1.125rem]">
      <label className="text-sm text-[#86909C] block">{title}</label>
      <div className="flex items-baseline w-full">
        {prefix && (
          <span className="text-lg font-semibold text-black">{prefix}</span>
        )}
        <input
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          placeholder={placeholders[title] || ""}
          className="flex-grow text-lg font-semibold text-black placeholder:text-[#86909C] placeholder:font-medium outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
