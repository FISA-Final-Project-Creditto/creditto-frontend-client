"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomBar from "../components/BottomBar";
import BottomSheet from "../components/BottomSheet";
import Step from "./components/Step";
import { Check } from "lucide-react";

const INITIAL_CHECKS = {
  term1: false,
  term2: false,
  term3: false,
  term4: false,
};

export default function AuthStepPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(INITIAL_CHECKS);

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  // BottomSheet 닫힐 때 자동 초기화
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) setCheckedItems(INITIAL_CHECKS);
  };

  // 신분증 준비 알림 화면으로 이동
  const handleNavigation = () => {
    if (allChecked) {
      setOpen(false);
      router.push("/auth/ocr/identification");
    }
  };

  return (
    <main className="min-h-dvh bg-white flex flex-col items-start pt-[100px] pb-[calc(68px+24px+env(safe-area-inset-bottom))]">
      {/* 인증서 발급 안내 */}
      <h1 className="text-[1.375rem] font-semibold text-[#000] mb-[35px]">
        인증서 발급은 아래 순서로 진행돼요
      </h1>

      {/* 단계 */}
      <section className="flex flex-col gap-[1.875rem]">
        <Step title="비대면 실명확인" subtitle="외국인 등록증을 준비해주세요" />
        <Step
          title="간편 비밀번호 설정"
          subtitle="6자리 간편 비밀번호를 설정합니다."
        />
      </section>

      {/* 하단 고정 버튼 */}
      <BottomBar
        label="인증서 발급하기"
        onClick={() => setOpen(true)}
        isActive={true}
      />

      {/* 바텀시트 */}
      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <p className="text-[18px] text-[#4E5969] mb-[35px]">
          한 번 만들면 n년동안 쓸 수 있어요
        </p>

        {/* 체크 버튼 리스트 */}
        <div className="flex flex-col gap-[10px] mb-[20px]">
          {[
            { key: "term1", text: "[필수] 본인 확인 서비스 약관 및 동의사항" },
            { key: "term2", text: "[필수] 크레디토 전자인증서비스 약관" },
            {
              key: "term3",
              text: "[필수] 개인정보 수집·이용 동의(크레디토인증서)",
            },
            { key: "term4", text: "[필수] 고유식별정보 처리 동의" },
          ].map(({ key, text }) => (
            <button
              key={key}
              onClick={() => toggleCheck(key)}
              className="flex items-center gap-[10px] text-left"
            >
              <Check
                size={20}
                color={checkedItems[key] ? "#1A3668" : "#E5E6EB"}
              />
              <p className="text-[#4E5969] text-sm">{text}</p>
            </button>
          ))}
        </div>

        {/* 버튼 */}
        <button
          disabled={!allChecked}
          onClick={handleNavigation}
          className={`
            w-full h-[40px] rounded-[10px] text-white text-[1.125rem] font-semibold 
            active:opacity-90 transition-colors mt-[4rem] mb-[0.938rem]
            ${allChecked ? "bg-[#1A3668]" : "bg-[#99A6BC] cursor-not-allowed"}
          `}
        >
          인증서 발급하기
        </button>

        {/* 다음에 발급하기 */}
        {/* ✅ TODO: 로그인 창으로 이동 */}
        <center>
          <button className="text-[#86909C] text-[14px]">
            다음에 발급하기
          </button>
        </center>
      </BottomSheet>
    </main>
  );
}
