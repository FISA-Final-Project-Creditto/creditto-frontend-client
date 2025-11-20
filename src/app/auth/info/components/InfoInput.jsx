"use client";

export default function InfoInput({
  title,
  inputMode,
  value,
  onChange,
  prefix,
}) {
  // 타이틀별 placeholder 문구
  const placeholders = {
    이름: "이름을 대문자로 입력해주세요",
    생년월일: "생년월일을 입력해주세요(8자리)",
    외국인등록번호: "외국인등록번호를 입력해주세요",
    주소: "외국인등록증에 기재된 주소를 입력해주세요",
    체류지역: "체류지역을 입력해주세요",
    전화번호: "010-0000-0000",
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
