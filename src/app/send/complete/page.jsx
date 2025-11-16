"use client";

import Header from "../components/Header";
import Image from "next/image";
import CreditScoreBanner from "./components/CreditPointBanner";
import BottomBar from "../components/BottomBar";
import Term from "../components/Term";
import { useRouter } from "next/navigation";

export default function CompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header>
        <Header />
      </header>

      <section className="flex flex-col gap-[2.188rem]">
        <h1 className="text-left mt-[3.438rem] text-[1.563rem] text-[#1A3668] font-bold">
          신청이 완료되었습니다
        </h1>

        {/* 우리은행 벌 캐릭터 */}
        <center>
          <Image src="/wooriBee.png" alt="Woori Bee" width={125} height={200} />
        </center>

        <p className="text-left text-xl font-bold text-black">
          현재 신청도 접수 :{" "}
          <span className="font-bold text-[#1A3668]">757</span>점
        </p>

        {/* 신용도 점수 배너 */}
        <section className="flex flex-col gap-4">
          <CreditScoreBanner label="12개월 정기 송금시" point="767" />
          <CreditScoreBanner label="18개월 정기 송금시" point="777" />
          <CreditScoreBanner label="24개월 정기 송금시" point="787" />
        </section>

        {/* 약관 동의 */}
        <Term />
      </section>

      {/* 하단 버튼 */}
      <footer>
        <BottomBar
          label="완료"
          onClick={() => router.push("/send")}
          isActive={true}
        />
      </footer>
    </div>
  );
}
