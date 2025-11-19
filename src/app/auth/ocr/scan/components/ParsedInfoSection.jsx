"use client";

import InfoDisplayField from "./InfoDisplayField";

export default function ParsedInfoSection({ parsedData }) {
  return (
    <div className="flex flex-col text-left">
      <h1 className="text-2xl font-bold mb-[20px]">아래 정보가 맞나요?</h1>

      <div className="flex flex-col items-start space-y-[0.938rem]">
        <InfoDisplayField
          label="외국인등록번호"
          value={parsedData?.alienRegNum ?? ""}
        />
        <InfoDisplayField label="이름" value={parsedData?.name ?? ""} />
        <InfoDisplayField label="성별" value={parsedData?.sex ?? ""} />
        <InfoDisplayField
          label="국가 / 지역"
          value={parsedData?.nationality ?? ""}
        />
        <InfoDisplayField
          label="발급 일자"
          value={parsedData?.issueDateIso || parsedData?.issueDateRaw || "-"}
        />
        <InfoDisplayField
          label="비자 유형"
          value={parsedData?.visaType ?? ""}
        />
        <InfoDisplayField
          label="발급 기관"
          value={parsedData?.authority ?? ""}
        />
      </div>
    </div>
  );
}
