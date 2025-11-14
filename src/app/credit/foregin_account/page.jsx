'use client'
import AppHeader from "@/src/common/AppHeader/AppHeader";
import React from "react";
import { useRouter } from "next/navigation";
import PassportCountryGrid from "./components/PassportCountryGrid";

export default function page() {
  const router = useRouter();

  const handleSelect = (country) => {
    // 선택 시 현재 페이지 쿼리에 선택된 국가 코드 추가 (shallow push)
    router.push(`?country=${country.code}`);
  };
  return (
    <main className="h-dvh flex justify-center items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto justify-start flex flex-col bg-white">
        <AppHeader
          title="외국인 계좌 조회"
          showHamburger={false}
          showBack={true}
          show={true}
        />
        <div className="mt-8 text-xl font-bold text-left ml-5 h-20">
          <span>어느나라의 계좌를 사용하시겠습니까?</span>
        </div>

        <div className="mt-2">
          <PassportCountryGrid onSelect={handleSelect} />
        </div>
      </div>
    </main>
  );
}
