"use client";
import Hambuger from "@/src/app/main/components/Hambuger";
import React from "react";

export default function AppHeader({
  title = "앱",
  showBack = true,
  show = true,
  showHamburger = true,
}) {
  if (!show) return null;

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white ">
      <div className="w-9 h-10 flex items-center">
        {showBack && <img src="/icon/back.png" className="w-2.5 h-2.5 cursor-pointer" onClick={()=>{history.back()}}/>}
      </div>

      <h1 className="text-lg font-semibold ">{title}</h1>

      <div className="w-9 h-10 flex items-center justify-end">
        {showHamburger && <Hambuger />}
      </div>
    </header>
  );
}
