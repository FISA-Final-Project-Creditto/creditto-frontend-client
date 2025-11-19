"use client";

import { useState } from "react";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../ocr/components/BottomBar";
import { useRouter, useSearchParams } from "next/navigation";
import InfoInput from "./components/InfoInput";
import Image from "next/image";

export default function InfoInputPage() {
  // ScanPage에서 전달받은 params로 이미지 링크와 국적 추출
  const searchParams = useSearchParams();
  const previewUrl = searchParams.get("previewUrl");
  const initialNationality = searchParams.get("nationality");

  const [formData, setFormData] = useState({
    name: "홍길동",
    birthDate: "",
    registrationNumber: "123456 - 1234567",
    phoneNumber: "3412-6179", // 010- 제외한 부분
    nationality: initialNationality,
  });

  const router = useRouter();

  const handleChange = (field, value) => {
    let formattedValue = value;

    // 생년월일 형식(yyyy-mm-dd)대로 입력
    if (field === "birthDate") {
      const cleaned = value.replace(/\D/g, "").slice(0, 8);
      if (cleaned.length > 6) {
        formattedValue = `${cleaned.slice(0, 4)}-${cleaned.slice(
          4,
          6
        )}-${cleaned.slice(6)}`;
      } else if (cleaned.length > 4) {
        formattedValue = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
      } else {
        formattedValue = cleaned;
      }
    }

    // 전화번호 형식(010-0000-0000)대로 입력(010은 고정)
    if (field === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 8);
      if (cleaned.length > 4) {
        formattedValue = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
      } else {
        formattedValue = cleaned;
      }
    }

    // 상태값 업데이트
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  // 전화번호와 생년월일 전달
  // TODO: 추후에 수정
  const handleSubmit = () => {
    const fullPhoneNumber = `010-${formData.phoneNumber}`;
    const dataToSubmit = { ...formData, phoneNumber: fullPhoneNumber };
    console.log("Form submitted:", dataToSubmit);

    router.push("/auth/pw");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header>
        <AppHeader title="신분증 정보 입력" showHamburger={false} />
      </header>

      {/* Card Preview */}
      {previewUrl && (
        <div className="flex justify-center pt-5">
          <div className="relative w-80 h-52 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={previewUrl}
              alt="미리보기 이미지"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 회원정보 입력 폼 */}
      <div className="flex-1 pt-[2.188rem] space-y-4">
        {/* 이름 */}
        <InfoInput
          title="이름"
          inputMode=""
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        {/* 생년월일 */}
        <InfoInput
          title="생년월일"
          inputMode="numeric"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
        />

        {/* 외국인등록번호 */}
        <InfoInput
          title="외국인등록번호"
          inputMode="numeric"
          value={formData.registrationNumber}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              registrationNumber: e.target.value,
            }))
          }
        />

        {/* 전화번호 */}
        <InfoInput
          title="전화번호"
          inputMode="numeric"
          prefix="010-"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />

        {/* 국가 / 지역 */}
        <InfoInput
          title="국가 / 지역"
          inputMode=""
          value={formData.nationality}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nationality: e.target.value }))
          }
        />
      </div>

      {/* Bottom Button */}
      <footer>
        <BottomBar
          label="간편 비밀번호 설정"
          onClick={handleSubmit}
          isActive={true}
        />
      </footer>
    </div>
  );
}
