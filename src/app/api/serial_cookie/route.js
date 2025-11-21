import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // 서버에서 쿠키를 읽거나 쓰기 위해 사용

export async function POST(request) {
  try {
    const { serialNumber } = await request.json();

    if (!serialNumber) {
      return NextResponse.json(
        { message: "Serial number is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    // HttpOnly 쿠키에 저장
    cookieStore.set("serialNumber", serialNumber, {
      httpOnly: true, // 쿠키를 JS로 읽을 수 없게 설정
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax", // 기본 CSRF 방어 옵션
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: "/", // 전체 경로에서 접근 가능
    });

    return NextResponse.json({
      message: "Serial number cookie set successfully",
    });
  } catch (error) {
    console.error("Error setting serial number cookie:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
