"use client";

import ConsentAgree from "./components/ConsentAgree";
import { useTranslations } from "next-intl";

export default function ConsentPage() {
  const t = useTranslations("auth.ocrConsent");
  // 약관 동의서
  const consents = [
    {
      id: 7,
      label: t("terms1"),
      required: true,
    },
    {
      id: 8,
      label: t("terms2"),
      required: true,
    },
    {
      id: 9,
      label: t("terms3"),
      required: true,
    },
    { id: 10, label: t("terms4"), required: true },
  ];

  return <ConsentAgree title={t("title")} consents={consents} />;
}
