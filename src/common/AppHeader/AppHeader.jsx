"use client";
import Hambuger from "@/src/app/main/components/Hambuger";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function AppHeader({
  title = "앱",
  showBack = true,
  show = true,
  showHamburger = true,
}) {
  if (!show) return null;

  return (
    <header className="w-full flex items-center justify-between  py-3 bg-white ">
      <div className="w-10 h-10 flex items-center">
        {showBack && <ChevronLeft className="w-15 h-15 cursor-pointer" onClick={()=>{history.back()}}/>}
      </div>

      <h1 className="text-lg font-semibold ">{title}</h1>

      <div className="w-10 h-10 flex items-center justify-end">
        {showHamburger && <Hambuger />}
      </div>
    </header>
  );
}
