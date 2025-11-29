"use client";
import Hambuger from "@/src/app/[locale]/main/components/Hambuger";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function AppHeader({
  title,
  showBack = true,
  show = true,
  showHamburger = true,

  // 수정 관련
  showEdit = false,
  edit,
  handleEdit,
}) {
  if (!show) return null;

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white ">
      <div className="w-9 h-10 flex items-center">
        {showBack && (
          <ChevronLeft
            className="w-15 h-15 cursor-pointer"
            onClick={() => {
              history.back();
            }}
          />
        )}
      </div>

      <h1 className="text-lg font-semibold ">{title}</h1>

      <div className="w-9 h-10 flex items-center justify-end">
        {showHamburger && <Hambuger />}
        {showEdit && !edit && (
          <button
            onClick={handleEdit}
            className="text-sm font-semibold text-[#4D6389]"
          >
            수정
          </button>
        )}
      </div>
    </header>
  );
}
