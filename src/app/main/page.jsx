"use client";
import React from "react";
import Hambuger from "./components/Hambuger";
import { CarouselDemo } from "./components/MainCarousel";
import LoanButton from "./components/LoanButton";
import Remittance from "./components/Remittance";
import MoneyExchange from "./components/MoneyExchange/MoneyExchange";
import Header from "./components/Header/Header";
import Credit from "../maine/components/Credit/Credit";
import RoundedIconTabs from "./components/Tabs";
import FunctionButton from "./components/FunctionButton/FunctionButton";
import Money from "../maine/components/Money/Money";

export default function MainPage() {
  return (
    <>
      <Header />
      <main className="">


        <div className="px-5 mt-2">
           <Money />
          <RoundedIconTabs />
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
