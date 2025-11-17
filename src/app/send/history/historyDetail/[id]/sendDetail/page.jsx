"use client";

import Header from "@/src/app/send/components/Header";
import Divider from "@/src/app/send/result/components/Divider";
import InfoRow from "@/src/app/send/result/components/InfoRow";
import { useRouter } from "next/navigation";

export default function SendDetailPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      <header className="mb-[2.188rem]">
        <Header />
      </header>

      {/* 신청 내역 */}
      <section className="border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
        {/* 송금 유형 정보 */}
        <div className="space-y-3.75">
          <InfoRow label="출금 계좌" value="123-4567-89" />
          <InfoRow label="수취 통화 코드" value="USD" />
          <InfoRow label="송금 통화 코드" value="USD" />
          <InfoRow label="외화 거래 금액" value="100,000" />
          <InfoRow label="송금 주기" value="매월 10일" />
          <InfoRow label="송금 시작일" value="2025년 10월 29일" />
        </div>

        <Divider />

        {/* 송금인 정보 */}
        <div>
          <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
            송금인 정보
          </h3>
          <div className="space-y-3.75">
            <InfoRow label="이름" value="Richard Park" />
            <InfoRow label="국가" value="미국(USA)" />
            <InfoRow label="거주도시" value="Los Angeles" />
            <InfoRow
              label="주소 (우편번호)"
              value={
                <span className="text-right">
                  Busan, Rodeo-street, 124
                  <br />
                  103-102 (21345)
                </span>
              }
            />
          </div>
        </div>

        <Divider />

        {/* 수신인 정보 */}
        <div>
          <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
            수신인 정보
          </h3>
          <div className="space-y-3.75">
            <InfoRow
              label="국가"
              value={
                <span className="flex items-center justify-end gap-2">
                  <span className="text-xl">🇺🇸</span>
                  United States
                </span>
              }
            />
            <InfoRow label="이름" value="Bob Kim" />
            <InfoRow label="전화번호" value="+1 32-123-4211" />
            <InfoRow label="통화 코드" value="USD" />
            <InfoRow label="수취 은행명" value="JP모건 체이스" />
            <InfoRow label="수취 은행 코드" value="JPMCUS33" />
            <InfoRow label="계좌 번호" value="1022-104-102481" />
          </div>
        </div>
      </section>
    </main>
  );
}
