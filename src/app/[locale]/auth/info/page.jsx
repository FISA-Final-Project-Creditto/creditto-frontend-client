"use client";
import { useState } from "react";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import BottomBar from "../ocr/components/BottomBar";
import { useRouter } from "next/navigation";
import InfoInput from "./components/InfoInput";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/src/store/features/signup/userSlice";
import { registerUser } from "@/src/app/api/axios";
import { countryCodes } from "../../constants/countryCode";
import { startSettingMode as settingModeAction } from "@/src/store/features/simplepw/simplepwSlice";

export default function InfoInputPage() {
  const t = useTranslations("auth.info");
  // Redux 스토어에서 ocr과 user 데이터 전체를 가져오기
  const { imageData: previewUrl, ...ocrData } = useSelector(
    (state) => state.ocr
  );
  const userData = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: userData.name ?? "",
    birthDate: userData.birthdate ?? "",
    registrationNumber: ocrData.alienRegNum ?? "",
    phoneNumber: userData.phoneNumber ?? "",
    address: userData.address ?? "",
    nationality: ocrData.nationality ?? "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const settingMode = useSelector((state) => state.simplepw.settingMode);
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

    // 전화번호 형식(010-0000-0000)
    if (field === "phoneNumber") {
      let cleaned = value.replace(/\D/g, ""); // Remove non-digits
      if (cleaned.length > 11) {
        cleaned = cleaned.slice(0, 11); // Limit to 11 digits
      }

      // Format as 010-XXXX-XXXX
      if (cleaned.length > 7) {
        formattedValue = `${cleaned.slice(0, 3)}-${cleaned.slice(
          3,
          7
        )}-${cleaned.slice(7)}`;
      } else if (cleaned.length > 3) {
        formattedValue = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else {
        formattedValue = cleaned;
      }
    }

    // 공통 상태 업데이트
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async () => {
    try {
      dispatch(settingModeAction()); // OK

      const matched = countryCodes.find((c) => c.name === formData.nationality);

      // API 요청을 위해 formData의 키를 API 사양에 맞게 조정
      const data = {
        name: formData.name,
        birthDate: formData.birthDate,
        countryCode: matched?.countryCode ?? "KOR",
        phoneNo: formData.phoneNumber, // phoneNumber를 phoneNo로 변경
        address: formData.address,
        isAgreed: true, // 인증서 동의 여부
        // name: "이우리",
        // birthDate: "2001-01-12",
        // countryCode: "KOR",
        // phoneNo: "010-2001-0102", // phoneNumber를 phoneNo로 변경
        // address: "서울특별시 송파구",
      };

      const res = await registerUser(data);

      if (res && res.data) {
        console.log(t("userRegistrationSuccess"), res.data);
        console.log(t("userId"), res.data.data.userId);

        dispatch(
          setUserData({
            name: formData.name,
            birthDate: formData.birthDate,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            userId: res.data.data.userId,
          })
        );

        router.push("/auth/pw");
      }
    } catch (error) {
      console.error(t("failedToRegisterUser"), error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header>
        <AppHeader title={t("title")} showHamburger={false} />
      </header>

      {/* Card Preview */}
      {previewUrl && (
        <div className="flex justify-center pt-5">
          <div className="relative w-80 h-52 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={previewUrl}
              alt={t("previewImage")}
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
          title={t("name")}
          inputMode=""
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {/* 생년월일 */}
        <InfoInput
          title={t("birthdate")}
          inputMode="numeric"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
        />

        {/* 외국인등록번호 */}
        <InfoInput
          title={t("alienRegistrationNumber")}
          inputMode="numeric"
          value={formData.registrationNumber}
          onChange={(e) => handleChange("registrationNumber", e.target.value)}
        />

        {/* 전화번호 */}
        <InfoInput
          title={t("phoneNumber")}
          inputMode="numeric"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />

        {/* 국내체류지 */}
        {/* ✅ TODO: 추후에 카카오 API 적용 */}
        <InfoInput
          title={t("address")}
          inputMode=""
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        {/* 국가 / 지역 */}
        <InfoInput
          title={t("areaOfResidence")}
          inputMode=""
          value={formData.nationality}
          onChange={(e) => handleChange("nationality", e.target.value)}
        />
      </div>

      {/* Bottom Button */}
      <footer>
        <BottomBar
          label={t("setSimplePassword")}
          onClick={handleSubmit}
          isActive={true}
        />
      </footer>
    </div>
  );
}
