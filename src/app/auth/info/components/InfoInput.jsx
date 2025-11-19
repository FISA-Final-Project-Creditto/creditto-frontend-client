"use client";

export default function InfoInput({
  title,
  inputMode,
  value,
  onChange,
  prefix,
}) {
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
          placeholder={
            title === "생년월일" ? "생년월일을 입력해주세요(8자리)" : ""
          }
          className="flex-grow text-lg font-semibold text-black placeholder:text-[#86909C] placeholder:font-medium outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
