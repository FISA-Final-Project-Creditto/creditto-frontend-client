"use client";

import InfoDisplayField from "./InfoDisplayField";
import { useTranslations } from "next-intl";

export default function ParsedInfoSection({ parsedData }) {
  const t = useTranslations("auth.scan");
  return (
    <div className="flex flex-col text-left">
      <h1 className="text-2xl font-bold mb-[20px]">{t("infoCorrect")}</h1>

      <div className="flex flex-col items-start space-y-[0.938rem]">
        <InfoDisplayField
          label={t("alienRegistrationNumber")}
          value={parsedData?.alienRegNum ?? ""}
        />
        <InfoDisplayField label={t("name")} value={parsedData?.name ?? ""} />
        <InfoDisplayField label={t("gender")} value={parsedData?.sex ?? ""} />
        <InfoDisplayField
          label={t("countryRegion")}
          value={parsedData?.nationality ?? ""}
        />
        <InfoDisplayField
          label={t("issueDate")}
          value={parsedData?.issueDateIso || parsedData?.issueDateRaw || "-"}
        />
        <InfoDisplayField
          label={t("visaType")}
          value={parsedData?.visaType ?? ""}
        />
        <InfoDisplayField
          label={t("issuingAuthority")}
          value={parsedData?.authority ?? ""}
        />
      </div>
    </div>
  );
}
