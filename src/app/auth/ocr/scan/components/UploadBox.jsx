"use client";

import { useRef } from "react";
import { ScanSearch } from "lucide-react";

export default function UploadBox({ onSelect }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // 공통 onChange
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onSelect?.(file);
    // 같은 파일 다시 선택 가능하도록 value 초기화
    e.target.value = "";
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xs">
        {/* 점선 박스 */}
        <div className="w-full rounded-2xl border-2 border-dashed border-[#C9CDD4] py-10 text-center bg-white shadow-sm">
          <section className="flex flex-col items-center gap-4">
            {/* 갤러리 선택 */}
            <ScanSearch
              className="w-20 h-20 text-[#4E5969]"
              onClick={() => galleryInputRef.current?.click()}
            />

            {/* 안내문 */}
            <p className="text-sm text-[#4E5969]">
              지원 형식: JPG · JPEG · PNG
            </p>
          </section>
        </div>

        {/* 숨김 파일 입력: 카메라 */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/jpeg,image/png,image/tiff,application/pdf,.jpg,.jpeg,.png,.tif,.tiff,.pdf"
          capture="environment" // 후면 카메라 우선
          className="hidden"
          onChange={handleChange}
        />

        {/* 숨김 파일 입력: 갤러리 */}
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png,image/tiff,application/pdf,.jpg,.jpeg,.png,.tif,.tiff,.pdf" // capture 없음 → 갤러리
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
