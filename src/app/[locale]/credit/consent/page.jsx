"use client";

import { useRouter } from "next/navigation";
import ConsentAgree from "./components/ConsentAgree";
import { useTranslations } from "next-intl";

export default function ConsentPage() {
  const t = useTranslations("creditConsent");
  const nextPath = "/credit/foregin_account";
  // 약관 동의서
  const consents = [
    {
      id: 1,
      label: t("consent1"),
      required: true,
    },
    {
      id: 2,
      label: t("consent2"),
      required: true,
    },
    { id: 3, label: t("consent3"), required: true },
  ];

  const router = useRouter();

  const handleBack = () => {
    router.push("/credit/first");
  };

  return (
    <ConsentAgree
      title={t("title")}
      consents={consents}
      nextPath={nextPath}
      onBackClick={handleBack}
    />
  );
}
