"use client";

import { useEffect, useRef, useState } from "react";
import UploadBox from "./components/UploadBox";
import ScanPreview from "./components/ScanPreview";
import axios from "axios";
import { parseAlienRegistration } from "../utils/parseAlienRegistration";
import { useRouter } from "next/navigation";
import ParsedInfoSection from "./components/ParsedInfoSection";
import BottomBar from "../components/BottomBar";
import { useDispatch } from "react-redux";
import { setOcrData } from "@/src/store/features/ocr/ocrSlice";
import { countryCodes } from "@/src/app/[locale]/constants/countryCode";
import { useTranslations } from "next-intl";
import { countryCodes } from "@/src/app/[locale]/constants/countryCode";
import { useTranslations } from "next-intl";

const DOCUMENT_TYPE_ALIEN_CARD = "Alien Registration Card"; // 외국인등록증 상수로 선언

// axios를 사용하여 OCR API 호출
const requestOCR = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/ocr", formData);
    return response.data;
  } catch (error) {
    console.error("Frontend requestOCR error (full error object):", error);
    if (axios.isAxiosError(error) && error.response) {
      // axios 에러면서 response가 있을 경우, 백엔드에서 내려준 응답을 그대로 throw
      throw error.response.data;
    }
    throw error; // 그 외 에러는 그대로 재throw
  }
};

export default function ScanPage() {
  const t = useTranslations("auth.scan");
  const router = useRouter();
  const dispatch = useDispatch();

  const t = useTranslations("auth.scan");
  const router = useRouter();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const previewUrlRef = useRef(""); // 현재 미리보기 URL 저장(해제용)

  const [ocrState, setOcrState] = useState({
    isPending: false, // OCR 분석 중
    isFileRejected: false, // 문서 판별 실패
    error: null, // OCR 분석 실패
    data: null, // 원본 OCR 응답
    parsedData: null, // 파싱된 OCR 데이터
  });

  // 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  // 파일 선택 핸들러
  const handleSelectFile = async (f) => {
    // 이전 미리보기 URL 해제
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }

    // 이미지 선택 취소 시 초기화
    if (!f) {
      setFile(null);
      setPreview("");
      setOcrState({
        isPending: false,
        isFileRejected: false,
        error: null,
        data: null,
        parsedData: null,
      });
      return;
    }

    // 새 미리보기 설정
    const url = URL.createObjectURL(f);
    previewUrlRef.current = url;

    setFile(f);
    setPreview(url); // 미리보기에 보여질 이미지 URL 업데이트

    // OCR 분석 시작
    setOcrState({
      isPending: true,
      isFileRejected: false,
      error: null,
      data: null,
      parsedData: null,
    });

    try {
      const ocrData = await requestOCR(f); // 응답값
      const image = ocrData?.images?.[0];

      // 외국인등록증인지 아닌지 여부 확인
      const idtype = image?.idCard?.result?.idtype ?? null;
      const isCorrectDocument = idtype === DOCUMENT_TYPE_ALIEN_CARD;

      if (!isCorrectDocument) {
        // 문서 판별 실패
        setOcrState({
          isPending: false,
          isFileRejected: true,
          error: {
            message: t("notAlienRegistrationCard"),
            description: t("uploadValidImage"),
          },
          data: null,
          parsedData: null,
        });
      } else {
        // 문서 판별 성공 → 파싱 실행
        const parsed = parseAlienRegistration(ocrData);

        // Redux 스토어에 데이터 저장
        dispatch(
          setOcrData({
            imageData: url,
            nationality: parsed.nationality,
            alienRegNum: parsed.alienRegNum,
          })
        );

        setOcrState({
          isPending: false,
          isFileRejected: false,
          error: null,
          data: ocrData, // 원본 전체 응답
          parsedData: parsed, // 파싱된 핵심 데이터
        });
      }
    } catch (e) {
      console.error(t("handleSelectFileError"), e);

      // 에러 처리
      setOcrState({
        isPending: false,
        isFileRejected: false,
        error: {
          message: e.error || t("analysisFailed"),
          description: e.details?.error || e.message || t("tryAgain"),
        },
        data: null,
        parsedData: null,
      });
    }
  };

  // "다시 촬영하기" 핸들러
  const handleRetake = () => {
    handleSelectFile(null);
  };

  return (
    <main className="min-h-dvh flex flex-col justify-center pt-10 pb-0">
      {/* 업로드 박스 또는 미리보기 */}
      {!preview ? (
        <UploadBox onSelect={handleSelectFile} />
      ) : (
        <>
          {/* 이미지 미리보기 */}
          <ScanPreview src={preview} state={ocrState} />

          {/* 다시 촬영하기 */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleRetake}
              className="text-[#86909C] text-sm underline transition-colors"
            >
              {t("retakePhoto")}
            </button>
          </div>
        </>
      )}

      {/* 분석된 등록증 정보 */}
      {ocrState.parsedData && (
        <>
          <section className="mt-8">
            <ParsedInfoSection parsedData={ocrState.parsedData} />
          </section>

          <footer>
            <BottomBar
              label={t("confirm")}
              onClick={() => router.push("/auth/info")}
              isActive={true}
            />
          </footer>
        </>
      )}
    </main>
  );
}
