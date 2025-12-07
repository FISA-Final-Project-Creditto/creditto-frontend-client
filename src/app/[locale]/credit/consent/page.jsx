"use client";

import { useRouter } from "next/navigation";
import ConsentAgree from "./components/ConsentAgree";

export default function ConsentPage() {
  const nextPath = "/credit/foregin_account";
  // 약관 동의서
  const consents = [
    {
      id: 1,
      label: "개인(신용)정보 수집·이용 동의서(신용평가 목적)",
      required: true,
    },
    {
      id: 2,
      label: "신용정보조회(CB사) 동의서",
      required: true,
    },
    { id: 3, label: "거래내역 기반 신용평가 모델 활용 동의서", required: true },
  ];

  const router = useRouter();

  const handleBack = () => {
    router.push("/credit/first");
  };

  return (
    <ConsentAgree
      title="약관 동의"
      consents={consents}
      nextPath={nextPath}
      onBackClick={handleBack}
    />
  );
}
