import AppHeader from "@/src/common/AppHeader/AppHeader";
import React from "react";
import Loanlist from "./components/Loanlist";

export default function LoanPage() {
  return (
    <div className="h-dvh flex flex-col">
      <AppHeader
        title=""
        show={true}
        showBack={true}
        showHamburger={false}
      />
      <div className="w-full h-10  ">
        <div className="text-2xl text-center font-semibold">대출 상품</div>
      </div>
      <div className=" w-full flex justify-center items-center">
        <Loanlist />
      </div>
    </div>
  );
}
