"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Modal = ({ title, message, onClose, onConfirm }) => {
  const router = useRouter();
  const t = useTranslations("send.common");

  // 모달 내부를 눌렀을 때 모달이 꺼지는 것을 방지
  const preventOffModal = (event) => {
    event.stopPropagation();
  };

  // 모달이 뜬 상태에서는 뒷 화면 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose(); // Confirm 후 모달 닫기
  };

  return (
    <div
      id="모달 외부"
      onClick={onClose}
      className="fixed inset-0 flex justify-center px-[1.5rem] items-center w-full h-full bg-gray-500/50"
    >
      <main
        id="모달"
        onClick={preventOffModal}
        className="bg-white w-full rounded-[12px] "
      >
        <section className="px-[1.875rem] pt-[1.875rem]">
          <h2 className="text-[#1A3668] font-semibold text-[1.375rem] text-left mb-[10px]">
            {title}
          </h2>
          <div className="text-left whitespace-pre-line">{message}</div>
        </section>
        {/* 버튼 영역 */}
        <section className="flex w-full mt-6">
          {/* 아니요 */}
          <button
            className="w-full h-[2.875rem] bg-[#F2F3F5] text-[#1A3668] text-[0.875rem] font-bold rounded-bl-[12px]"
            onClick={onClose}
          >
            {t("no")}
          </button>

          {/* 예 */}
          <button
            className="w-full h-[2.875rem] bg-[#1A3668] text-white text-[0.875rem] font-bold rounded-br-[12px]"
            onClick={handleConfirm}
          >
            {t("yes")}
          </button>
        </section>
      </main>
    </div>
  );
};

export default Modal;
