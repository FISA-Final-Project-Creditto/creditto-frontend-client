"use client";

import ConsentAgree from "./components/ConsentAgree";

export default function ConsentPage() {
  // 약관 동의서
  const consents = [
    {
      id: 7,
      label: "[필수] 본인 확인 서비스 약관 및 동의사항",
      required: true,
    },
    {
      id: 8,
      label: "[필수] 크레디토 전자인증서비스 약관",
      required: true,
    },
    {
      id: 9,
      label: "[필수] 개인정보 수집·이용 동의(크레디토인증서)",
      required: true,
    },
    { id: 10, label: "[필수] 고유식별정보 처리 동의", required: true },
  ];

  return <ConsentAgree title="인증서 발급 동의" consents={consents} />;
}
