import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * 클라이언트의 요청에 'serialNumber' httpOnly 쿠키가 있는지 확인하는 API 라우트 핸들러
 * @param {Request} request - Next.js가 전달하는 요청 객체
 * @returns {NextResponse} - 쿠키 존재 여부를 담은 JSON 응답
 */
export async function GET(request) {
  try {
    const cookieStore = cookies();
    const serialNumberCookie = cookieStore.get("serialNumber");

    // 쿠키가 존재하고 값이 있는지 확인
    const hasCookie = !!(serialNumberCookie && serialNumberCookie.value);

    return NextResponse.json({ exists: hasCookie });
  } catch (error) {
    console.error("API /api/check-serial Error:", error);
    // 서버 내부 오류 발생 시, 클라이언트가 안전하게 처리할 수 있도록 false 응답
    return NextResponse.json({ exists: false, message: "Internal Server Error" }, { status: 500 });
  }
}