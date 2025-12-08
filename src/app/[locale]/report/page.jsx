"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomSheet from "@/src/common/UI/BottomSheet/BottomSheet";
import { credittoApi } from "@/src/app/api/axios";
import { useDispatch } from "react-redux";
import { setConsentChecked } from "@/src/store/features/consent/consentSlice";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Emoji from "../credit/components/Emoji";

export default function ReportPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("");
  const dispatch = useDispatch();

  // 언어 선택 시 PDF 다운로드 (클라이언트에서만 동작)
  useEffect(() => {
    const fetchPDF = async () => {
      if (!lang) return;

      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");
        if (!accessToken || !userId) {
          router.push("/signup/permission");
          return;
        }

        const res = await credittoApi.get(
          `/api/credit-score/report/${lang}/pdf/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/pdf",
            },
            responseType: "blob",
          }
        );

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `credit-report-${userId}-${lang}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        // 선택 초기화
        setLang("");
      } catch (err) {
        console.log("PDF 다운로드 오류:", err);
      }
    };

    fetchPDF();
  }, [lang, router]);

  useEffect(() => {
    // 약관 ID 리스트 아이디 초기화
    const consentIds = [1, 2, 3];

    // 각 약관의 체크 상태를 false로 초기화
    consentIds.forEach((id) => {
      dispatch(setConsentChecked({ id: String(id), checked: false }));
    });
  }, [dispatch]);

  return (
    <main className="h-dvh flex justify-center items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto justify-start flex flex-col bg-white">
        <AppHeader
          title="레포트 다운로드"
          showHamburger={false}
          showBack={true}
          show={true}
          onBackClick={() => router.replace("/main")} // 메인페이지로 이동하는 건 replace로
        />
        <div className="mt-8 text-2xl font-bold text-left ml-5 h-20">
          <span className="text-[#0C72BA] font-bold text-[26px]">레포트 다운로드</span>
          <br />
          <span>내 신용 보고서를 PDF로 받아보세요</span>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[150px] h-[150px] ">
            <Emoji />
          </div>
        </div>
        <div className="mt-5 text-xl font-medium text-left ml-5 h-15">
          <span>PDF 형식의 신용 평가 리포트를 제공합니다.</span>
          <br />
          <span>언어 선택 후 바로 다운로드하세요.</span>
        </div>
        <div className="mt-5 text-xl font-medium text-left ml-5 h-15">
          <span>리포트에는 점수 이력과 간략 평가가 포함됩니다.</span>
          <br />
          <span>회사 제출용 또는 개인 보관용으로 사용하세요.</span>
        </div>

        <div className="w-full flex flex-col justify-center mt-auto mb-14 px-4">
          {/* '연동없이 바로 조회하기' 텍스트 제거 */}
          {/* 해외계좌 조회 버튼 위치에 언어 선택으로 대체 */}
          <div className="w-full max-w-[440px]">
            <Select
              className="w-full border border-border rounded-lg p-2 hover:bg-muted transition"
              aria-label="신용 리포트 언어 선택"
              onSelectionChange={(key) => setLang(String(key))}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2 justify-center">
                  <SelectValue placeholder="보고서 다운로드" />
                </div>
              </SelectTrigger>

              <SelectPopover>
                <SelectListBox>
                  <SelectItem id="ko" value="ko">
                    <span className="text-xs font-medium">한국어</span>
                  </SelectItem>
                  <SelectItem id="en" value="en">
                    <span className="text-xs font-medium">영어</span>
                  </SelectItem>
                </SelectListBox>
              </SelectPopover>
            </Select>
          </div>
          {/* 중복된 Select 블록 삭제 (해외계좌 버튼 자리로 이동됨) */}
        </div>

        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          title="신용도 확인 및 활용 동의"
        >
          <div className="px-3 pb-6 text-sm">
            {/* 체크 항목 */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  [필수] 해외·국내 금융거래 정보 수집 및 이용 동의
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  [필수] 신용도 평가를 위한 개인(신용)정보 제공 동의
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  [필수] 신용도 평가 결과 보고서 생성 및 제공 동의
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#0C72BA]">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-gray-800">
                  [필수] 신용도 평가 서비스 이용 약관 동의
                </div>
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
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => setOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </BottomSheet>
      </div>
    </main>
  );
}
