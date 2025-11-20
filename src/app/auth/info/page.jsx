"use client";

import { useState } from "react";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../ocr/components/BottomBar";
import { useRouter } from "next/navigation";
import InfoInput from "./components/InfoInput";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/src/store/features/signup/userSlice";

export default function InfoInputPage() {
  // Redux 스토어에서 ocr과 user 데이터 가져오기
  const { imageData: previewUrl, nationality: initialNationality } =
    useSelector((state) => state.ocr);
  const { name, birthDate, phoneNumber } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: name ?? "",
    birthDate: birthDate ?? "",
    registrationNumber: "123456 - 1234567",
    phoneNumber: phoneNumber ?? "", // 010- 제외한 부분
    address: "",
    nationality: initialNationality || "", // 스토어에 국적이 없으면 빈 문자열
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    let formattedValue = value;

    // 생년월일 형식(yyyy-mm-dd)
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

    // 전화번호 형식(010-0000-0000) → 뒤 8자리만 관리
    if (field === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 8);
      if (cleaned.length > 4) {
        formattedValue = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
      } else {
        formattedValue = cleaned;
      }
    }

    // 공통 상태 업데이트
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  // 전화번호와 생년월일 전달
  // TODO: 추후에 수정
  const handleSubmit = async () => {
    // const fullPhoneNumber = `010-${formData.phoneNumber}`;
    // const dataToSubmit = { ...formData, phoneNumber: fullPhoneNumber };
    // console.log("Form submitted:", dataToSubmit);

    // 주소를 Redux 스토어에 저장
    dispatch(
      setUserData({
        address: address,
      })
    );
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
          onChange={(e) => handleChange("name", e.target.value)}
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
          onChange={(e) => handleChange("registrationNumber", e.target.value)}
        />

        {/* 전화번호 */}
        <InfoInput
          title="전화번호"
          inputMode="numeric"
          prefix="010-"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />

        {/* 국내체류지 */}
        {/* ✅ TODO: 추후에 카카오 API 적용 */}
        <InfoInput
          title="주소"
          inputMode=""
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        {/* 국가 / 지역 */}
        <InfoInput
          title="체류지역"
          inputMode=""
          value={formData.nationality}
          onChange={(e) => handleChange("nationality", e.target.value)}
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
