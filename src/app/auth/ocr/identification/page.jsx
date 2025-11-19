"use client";

import Image from "next/image";
import BottomBar from "../components/BottomBar";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setImageData } from "@/src/store/features/ocr/ocrSlice";
import BottomSheet from "@/src/common/UI/BottomSheet/BottomSheet";

export default function IDPage() {
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
    <div className="min-h-dvh bg-white flex flex-col pt-[100px] pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px] leading-tight">
        신분증(외국인 등록증)을 <br />
        준비해주세요
      </h1>

      <h2 className="text-[#4E5969] mb-[24px]">
        비대면 등록을 위해 신분증 촬영이 필요해요
      </h2>

      {/* 이미지 */}
      <Image
        src="/id-sample.png"
        alt="신분증 예시"
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
      <BottomBar label="외국인등록증 가져오기" onClick={handleBottomBarClick} />
    </div>
  );
}
