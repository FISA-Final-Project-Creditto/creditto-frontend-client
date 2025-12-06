"use client";

import { useRouter } from "next/navigation";
import DaumPostcode from "react-daum-postcode";
import { useTranslations } from "next-intl";
import AppHeader from "@/src/common/AppHeader/AppHeader";

export default function AddressSearchPage() {
  const router = useRouter();
  const t = useTranslations("send.components.addressModal");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
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
