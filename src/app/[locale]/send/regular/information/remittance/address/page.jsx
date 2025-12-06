"use client";

import { useRouter } from "next/navigation";
import DaumPostcode from "react-daum-postcode";
import { useTranslations } from "next-intl";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function AddressSearchPage() {
  const router = useRouter();
  const t = useTranslations("send.components.addressModal");

  // 주소 문자열 조합 함수
  const handleComplete = (data) => {
    let fullAddress = data.address;

    if (data.addressType === "R") {
      const extraParts = [data.bname, data.buildingName].filter(Boolean);
      if (extraParts.length > 0) {
        fullAddress += ` (${extraParts.join(", ")})`;
      }
    }

    // 주소를 쿼리 매개변수로 사용하여 이전 페이지로 돌아가기
    router.replace(
      `/send/regular/information/remittance?address=${encodeURIComponent(
        fullAddress
      )}`
    );
  };

  return (
    <main>
      <AppHeader
        title={t("title")}
        show={true}
        showBack={true}
        showHamburger={false}
      />
      <div className="bg-white h-screen overflow-hidden">
        <DaumPostcode
          onComplete={handleComplete}
          autoClose={false}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </main>
  );
}
