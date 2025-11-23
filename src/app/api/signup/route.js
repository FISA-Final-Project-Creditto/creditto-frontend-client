import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// In-Memory Session Store
// 서버 프로세스 메모리에 세션 정보를 저장하는 Map
// Next.js 서버가 재시작되거나 서버리스 환경에서 함수가 재호출되면 이 Map은 초기화
const sessionStore = new Map();

// 특정 UUID에 매핑된 serialNumber(인증서 ID)를 반환하는 서버 전용 유틸 함수
// 서버 내 다른 로직에서 세션 조회 용도로 사용 가능하지만 클라이언트에서는 실행이 되지 않음
export function getSerialNumber(uuid) {
  return sessionStore.get(uuid);
}

export async function POST(request) {
  try {
    const { serialNumber } = await request.json();

    // serialNumber 누락 시 에러 반환
    if (!serialNumber) {
      return NextResponse.json(
        { message: "Serial number is required" },
        { status: 400 }
      );
    }

    const uuid = randomUUID(); // 랜덤한 UUID 생성(serialNumber를 꺼낼 때 key 값으로 사용)

    sessionStore.set(uuid, serialNumber); // 서버 메모리 Map에 저장 (UUID → serialNumber)

    console.log("세션 생성에 성공하였습니다.");
    return NextResponse.json({ uuid });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
