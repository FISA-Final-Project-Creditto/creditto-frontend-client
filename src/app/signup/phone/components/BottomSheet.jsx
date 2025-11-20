"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomSheet from "../../../../common/UI/BottomSheet/BottomSheet";
import { useDispatch } from "react-redux";
import { setUserData } from "@/src/store/features/signup/userSlice";

export default function TestBottomSheetPage({ name, birthday, phoneNumber }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // 약관 체크 상태
  const [checked, setChecked] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });

  const toggleAll = () => {
    const newState = !checked.all;
    setChecked({
      all: newState,
      terms1: newState,
      terms2: newState,
      terms3: newState,
      terms4: newState,
    });
  };

  const toggleOne = (key) => {
    const newChecked = { ...checked, [key]: !checked[key] };
    const allChecked =
      newChecked.terms1 &&
      newChecked.terms2 &&
      newChecked.terms3 &&
      newChecked.terms4;

    setChecked({ ...newChecked, all: allChecked });
  };

  const isRequiredAllChecked =
    checked.terms1 && checked.terms2 && checked.terms3;

  return (
    <main className="h-[100dvh] flex justify-center bg-[#e5e5e5]">
      <div className="w-full justify-end  mx-auto flex flex-col bg-white">
        {/* 상단 안내 영역 */}

        {/* 바텀 시트 트리거 버튼 */}
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          title="휴대폰 본인확인 약관"
          trigger={
            <div className="w-full  h-[118px]  flex justify-center">
              <button className="cursor-pointer w-[90%] h-[60px] text-[22px] font-semibold flex justify-center items-center transition-colors rounded-lg bg-[#1A3668] text-white">
                다음
              </button>
            </div>
          }
        >
          {/* BottomSheet 안 내용 */}
          <div className="px-4 pb-4 pt-2">
            {/* 전체 동의 */}
            <label
              onClick={toggleAll}
              className="flex items-center p-4 w-full bg-gray-100 rounded-[6px] cursor-pointer"
            >
              <span
                className={`flex items-center justify-center w-6 h-6 border-2 rounded-full mr-3 transition-colors ${
                  checked.all
                    ? "border-[#1A3668] bg-[#1A3668]"
                    : "border-gray-400 bg-white"
                }`}
              >
                {checked.all && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <span className="text-[16px] font-semibold text-gray-900">
                휴대폰 본인확인 약관 전체 동의
              </span>
            </label>

            {/* 개별 약관 리스트 */}
            <ul className="mt-6 space-y-4">
              {[
                { key: "terms1", text: "서비스 이용약관 동의(필수)" },
                { key: "terms2", text: "개인정보 수집 및 이용 동의(필수)" },
                { key: "terms3", text: "고유식별정보 처리 동의(필수)" },
                { key: "terms4", text: "본인확인서비스 이용 동의(선택)" },
              ].map(({ key, text }) => {
                const isChecked = checked[key];

                return (
                  <li key={key}>
                    <label
                      onClick={() => toggleOne(key)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span
                        className={`flex items-center justify-center w-5 h-5 border rounded-sm transition-colors ${
                          isChecked
                            ? "border-[#1A3668] bg-[#1A3668]"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                      <p className="text-[15px] text-gray-700 leading-relaxed">
                        {text}
                      </p>
                    </label>
                  </li>
                );
              })}
            </ul>

            {/* 동의 버튼 */}
            <button
              disabled={!isRequiredAllChecked}
              className={`w-full h-[56px] mt-8 rounded-xl text-[16px] font-semibold flex items-center justify-center transition-colors
                ${
                  isRequiredAllChecked
                    ? "bg-[#1A3668] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              onClick={() => {
                if (!isRequiredAllChecked) return;
                setOpen(false);

                // 본인 인증에서 작성한 이름, 생년월일, 전화번호를 Redux 스토어에 저장
                dispatch(
                  setUserData({
                    name: name,
                    birthday: birthday,
                    phoneNumber: phoneNumber,
                  })
                );

                router.push("/signup/phone/sms");
              }}
            >
              동의하고 계속
            </button>
          </div>
        </BottomSheet>
      </div>
    </main>
  );
}
