"use client";
import React, { useEffect } from "react";
import MoneyExchange from "./components/MoneyExchange/MoneyExchange";
import Header from "./components/Header/Header";
import RoundedIconTabs from "./components/Tabs";
import FunctionButton from "./components/FunctionButton/FunctionButton";
import Money from "../maine/components/Money/Money";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function MainPage() {
  const router = useRouter();
  // Redux 스토어에서 계좌 정보를 가져옵니다.
  const accounts = useSelector((state) => state.account.accounts);


  useEffect(()=>{
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.replace("/");
    }

    // 가져온 계좌 정보를 콘솔에 출력하여 확인
    console.log("메인 페이지에서 확인한 계좌 정보:", accounts);
  })
  return (
    <>
      <Header />
      <main className="">


        <div className="px-5 mt-2">
           <Money accounts={accounts} />
          <RoundedIconTabs   />
          <FunctionButton />
        </div>
        <div className="px-5 mt-5 ">
          <div>
           
            
          </div>
        </div>

        <div className="w-full flex-1 bg-[#F3F6FB] flex overflow-auto rounded-3xl">
          <MoneyExchange />
        </div>
      </main>
    </>
  );
}
