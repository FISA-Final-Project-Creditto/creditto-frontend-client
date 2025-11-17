"use client";
import React from "react";
import Hambuger from "./components/Hambuger";
import { CarouselDemo } from "./components/MainCarousel";
import LoanButton from "./components/LoanButton";
import Remittance from "./components/Remittance";
import MoneyExchange from "./components/MoneyExchange/MoneyExchange";
import Header from "./components/Header/Header";

export default function MainPage() {
  return (
    <main className="h-dvh flex justify-center items-center bg-[#e5e5e5]">
      <div className="w-full max-w-[440px] min-h-dvh mx-auto justify-start flex flex-col bg-white">
        <Header />

        <div>
          <p className="text-[17px] font-bold text-gray-900 text-left">
            환영합니다
            <br />
            <span className="text-gray-500">
              <span className="text-[#2E5796]">정용준</span>님
            </span>
          </p>
        </div>

        <div className=" px-5  flex justify-start flex-col items-center ">
          <CarouselDemo />
        </div>

      <div className="flex justify-between items-start text-left w-full h-[100px] px-5 gap-5">
          <LoanButton />
          <Remittance />
      </div>
        <div className="w-full flex-1 bg-[#F3F6FB] flex overflow-auto rounded-3xl">
          <MoneyExchange />
        </div> 
      </div>
    </main>
  );
}
