import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";

// CORS 헤더 설정 함수
const getCorsHeaders = () => {
  return {
    "Access-Control-Allow-Origin": "*", // 실제 운영환경에서는 특정 도메인으로 제한하기
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-OCR-SECRET",
  };
};

// OPTIONS 사전 요청(Preflight) 처리
export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function POST(request) {
  try {
    // 요청에서 파일 추출
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "이미지 파일(file)이 필요합니다." },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    // 환경 변수 확인
    const invokeUrl = process.env.NAVER_CLOVA_OCR_INVOKE_URL;
    const secretKey = process.env.NAVER_CLOVA_OCR_SECRET_KEY;

    if (!invokeUrl || !secretKey) {
      console.error("Naver Clova OCR 환경 변수 누락");
      return NextResponse.json(
        { error: "서버 설정 오류: OCR URL 또는 Secret Key 누락" },
        { status: 500, headers: getCorsHeaders() }
      );
    }

    // 파일 → base64 인코딩
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // MIME 타입 혹은 파일명에서 확장자 추출
    const allowedImageFormats = ["jpg", "jpeg", "png"];
    const allowedDocumentFormats = ["pdf", "tif", "tiff"];
    const allAllowedFormats = [
      ...allowedImageFormats,
      ...allowedDocumentFormats,
    ];

    let format =
      (file.type && file.type.split("/")[1]) ||
      (file.name && file.name.split(".").pop());

    if (format) format = format.toLowerCase();

    // 허용되지 않는 확장자일 경우 에러 반환
    if (!format || !allAllowedFormats.includes(format)) {
      return NextResponse.json(
        {
          error: "지원하지 않는 파일 형식입니다.",
          details: `허용된 형식: ${allAllowedFormats.join(", ")}`,
        },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    // Naver Document OCR(JSON) 요청 바디
    const requestBody = {
      version: "V2",
      requestId: `req-${Date.now()}`,
      timestamp: Date.now(),
      images: [
        {
          format, // 예: "jpg", "png"
          name: file.name || "alienRegistration_test",
          data: base64Image, // base64 인코딩된 이미지
        },
      ],
    };

    // Naver OCR API 호출 (axios + application/json)
    const response = await axios.post(invokeUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": secretKey,
      },
    });

    console.log("OCR 성공 응답값:", response.data);

    return NextResponse.json(response.data, {
      status: 200,
      headers: getCorsHeaders(),
    });
  } catch (error) {
    console.error("OCR API 라우트 오류 (전체 에러 객체):", error);

    // axios 에러 처리
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "네이버 API 상세 오류 데이터:",
        JSON.stringify(error.response.data, null, 2)
      );

      return NextResponse.json(
        {
          error: "OCR 처리 중 오류가 발생했습니다.",
          details: error.response.data,
        },
        { status: error.response.status, headers: getCorsHeaders() }
      );
    }

    // 그 외 서버 내부 오류
    return NextResponse.json(
      { error: "서버 내부 오류" },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}
