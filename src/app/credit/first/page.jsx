"use client";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Emoji from "../components/Emoji";
import BottomSheet from "@/src/common/UI/BottomSheet/BottomSheet";
import BottomBar from "../../send/components/BottomBar";

export default function () {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <main className="h-dvh flex justify-center items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto justify-start flex flex-col bg-white">
        <AppHeader
          title="신용 평가"
          showHamburger={false}
          showBack={true}
          show={true}
        />
        <div className="mt-8 text-2xl font-bold text-left ml-5 h-20">
          <span className="text-[#0C72BA] font-bold text-[26px]">신용평가</span>{" "}
          하면 <br />
          <span>좋은 점이 무엇일까요?</span>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[150px] h-[150px] ">
            <Emoji />
          </div>
        </div>
        <div className="mt-5 text-xl font-medium text-left ml-5 h-15">
          <span>해외에서 사용하던 신용점수</span>
          <br />
          <span>이제 한국에서도 그대로 쓸 수 있어요</span>
        </div>
        <div className="mt-5 text-xl font-medium text-left ml-5 h-15">
          <span>송금 수수료 우대, 금리 인하 등</span>
          <br />
          <span>다양한 혜택을 느낄 수 있어요</span>
        </div>

        <div className="w-full flex flex-col justify-center mt-auto  ">
          <div
            className="w-full h-20 cursor-pointer flex justify-center items-center text-[#86909C] underline text-lg "
            onClick={(e) => {
              // 이벤트 버블링
              e.stopPropagation();
              router.push("/signup/permission");
            }}
          >
            연동없이 바로 조회하기
          </div>
              <BottomBar
            label="해외 계좌 조회하기"
            onClick={() => {
              router.push("/credit/foregin_account");
            }}
            isActive={true}
          />
        </div>
        
        <BottomSheet open={open} onOpenChange={setOpen} title="신용도 확인 및 활용 동의">
          <div className="px-3 pb-6 text-sm">
            {/* 체크 항목 */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-gray-800">[필수] 해외·국내 금융거래 정보 수집 및 이용 동의</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-gray-800">[필수] 신용도 평가를 위한 개인(신용)정보 제공 동의</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-gray-800">[필수] 신용도 평가 결과 보고서 생성 및 제공 동의</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-gray-800">[필수] 신용도 평가 서비스 이용 약관 동의</div>
              </div>
            </div>

            {/* 동의 버튼 */}
            <button
              className="w-full h-14 rounded-xl text-[16px] font-semibold flex items-center justify-center transition-colors bg-[#1A3668] text-white"
              onClick={() => {
                setOpen(false);
                router.push("/credit/foregin_account");
              }}
            >
              동의하기
            </button>

            <div className="mt-3 text-center">
              <button className="text-sm text-gray-500 underline" onClick={() => setOpen(false)}>
                닫기
              </button>
            </div>
          </div>
        </BottomSheet>
          </div>
    </main>
  );
}
