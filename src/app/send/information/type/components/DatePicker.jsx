"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Calendar, X } from "lucide-react";
import BottomBar from "../../../components/BottomBar";

export default function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false); // 달력 모달 open 상태

  // 날짜 클릭 시 실행
  const handleDayClick = (date) => {
    if (!date) return;
    const formattedDate = format(date, "yyyy.MM.dd"); // 날짜를 yyyy.MM.dd 형식으로 변환
    onChange(formattedDate); // 부모 컴포넌트로 날짜값 전달
    setIsOpen(false);
  };

  // Daypicker 내의 구성 요소들을 Tailwindcss로 스타일링
  const classNames = {
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", // 달력 영역을 감싸는 컨테이너
    month: "space-y-4", // 각 월별 컨테이너
    caption: "flex justify-between pt-1 relative items-center", // 월/년도 + 이동 버튼 컨테이너
    caption_label: "text-m font-medium", // 월/년도 텍스트
    nav: "space-x-1 flex items-center", // 이동 버튼 컨테이너
    nav_button: "h-7 w-7 bg-[#1A3668] p-0 opacity-50 hover:opacity-100", // 이동 버튼
    table: "w-full border-collapse space-y-1", // 날짜표를 구성하는 컨테이너
    head_row: "flex", // 요일이 들어가는 컨테이너
    head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]", // 요일 글자
    row: "flex w-full mt-2", // 날짜들이 들어가는 한 줄
    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // 날짜를 감싸는 <td>
    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-gray-200", // 각 날짜 버튼
    day_selected:
      "bg-[#1A3668] text-[#86909C] hover:bg-[#1A3668] focus:bg-[#1A3668] focus:text-[#86909C]", // 선택된 날짜
    day_today: "bg-gray-100 text-gray-900", // 오늘 날짜
    day_outside: "text-gray-400 opacity-50", // 이번달에 속하지 않은 날짜
    day_disabled: "text-gray-400 opacity-50", // 비활성 날짜
    day_range_middle: "aria-selected:bg-gray-100", // 날짜 범위의 중간 날짜
    day_hidden: "invisible", // 달력에 표시되지 않은 날짜
  };

  return (
    <div className="relative w-full">
      {/* 날짜 입력창 */}
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          readOnly
          onClick={() => setIsOpen(true)}
          placeholder="송금을 시작할 날짜를 선택하세요"
          className="w-full px-4 py-3 bg-[#F7F8FA] border-0 rounded-md appearance-none text-[#1F2329] placeholder:text-[#86909C] focus:outline-none cursor-pointer"
        />

        {/* 달력 아이콘(클릭 시 모달 창이 열림 */}
        <Calendar
          onClick={() => setIsOpen(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86909C] cursor-pointer"
        />
      </div>

      {/* 날짜 선택 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 모달 배경 */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* 모달 구성 요소 */}
          <div className="relative bg-white p-6 rounded-xl shadow-lg">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* 달력 */}
            <DayPicker
              mode="single"
              selected={value ? new Date(value.replace(/\./g, "-")) : undefined}
              onSelect={handleDayClick}
              classNames={classNames}
            />
          </div>
        </div>
      )}
    </div>
  );
}
