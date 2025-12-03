"use client";

import Image from "next/image";
import BottomBar from "../components/BottomBar";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setImageData } from "@/src/store/features/ocr/ocrSlice";
import BottomSheet from "@/src/common/UI/BottomSheet/BottomSheet";
import { useTranslations } from "next-intl";

export default function IDPage() {
  const t = useTranslations("auth.identification");
  const router = useRouter();
  // const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleBottomBarClick = () => {
    // fileInputRef.current.click();
    setIsOpen(true);
    router.push("/auth/ocr/scan");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImageData(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col pt-[100px] px-8 pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px] leading-tight">
        {t("title")}
      </h1>

      <h2 className="text-[#4E5969] mb-[24px]">
        {t("description")}
      </h2>

      {/* 이미지 */}
      <Image
        src="/id-sample.png"
        alt={t("idCardExample")}
        width={300}
        height={200}
        className="mx-auto"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* 하단 버튼 */}
      <BottomBar
        label={t("importAlienRegistrationCard")}
        onClick={handleBottomBarClick}
        isActive={true}
      />
    </div>
  );
}
