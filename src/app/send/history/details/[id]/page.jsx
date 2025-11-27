"use client";

import Divider from "@/src/app/send/result/components/Divider";
import InfoRow from "@/src/app/send/result/components/InfoRow";
import AppHeader from "@/src/common/AppHeader/AppHeader";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// 영수증처럼 내역 보여주는 페이지
export default function HistoryDetailPage() {
  const [edit, setEdit] = useState(false); // 수정 가능
  const params = useParams();
  const { id } = params;

  const router = useRouter();

  return (
    <main className="min-h-dvh flex flex-col bg-white">
      <header className="mb-[1.563rem]">
        <AppHeader title="해외 송금 내역" showHamburger={false} />
      </header>

      <div className="flex flex-col items-end px-5 gap-3">
        <button className="text-sm font-semibold text-[#4D6389] text-[#4D6389]">
          수정하기
        </button>

        {/* 신청 내역 */}
        <section className="w-full border border-[#86909C] rounded-xl px-[1.563rem] py-5 mb-[2.188rem]">
          {/* 송금 유형 정보 */}
          <div className="space-y-3.75">
            <InfoRow label="출금 계좌" value="123-4567-89" />
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
              <InfoRow label="국적" value="USA" />
              <InfoRow
                label="주소"
                value={
                  <span className="text-right">
                    Busan, Rodeo-street, 124
                    <br />
                    103-102
                  </span>
                }
              />
              <InfoRow label="송금 통화 코드" value="KRW" />{" "}
            </div>
          </div>

          <Divider />

          {/* 수신인 정보 */}
          <div>
            <h3 className="text-left font-bold text-[#4E5969] text-lg mb-[0.938rem]">
              수신인 정보
            </h3>
            <div className="space-y-3.75">
              <InfoRow label="이름" value="Bob Kim" />
              <InfoRow
                label="주소"
                value={
                  <span className="text-right">
                    Busan, Rodeo-street, 124
                    <br />
                    103-102
                  </span>
                }
              />
              <InfoRow label="전화 번호" value="111-111-1111" />
              <InfoRow
                label="국가"
                value={
                  <span className="flex items-center justify-end gap-2">
                    USA
                  </span>
                }
              />
              <InfoRow label="은행명" value="JPMorgan Chase" />
              <InfoRow label="계좌 번호" value="1022-104-102481" />
              <InfoRow label="수취 통화 코드" value="USD" />{" "}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
