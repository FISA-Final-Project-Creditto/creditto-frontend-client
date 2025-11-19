'use client'
import { useRouter } from "next/navigation";
import React from "react";

const DUMMY_LOANS = [
  {
    id: 1,
    logo: "/icon/woori.png",
    name: "우리은행",
    description: "우리 WON 깍아타기 자격인 대출",
    rate: "4.42%",
    amount: "3억원",
    period: "",
  },
  {
    id: 2,
    logo: "/icon/woori.png",
    name: "우리은행",
    description: "우리 WON 깍아타기 자격인 대출",
    rate: "5.4%",
    amount: "3억원",
    period: "",
  },
  {
    id: 3,
    logo: "/icon/woori.png",
    name: "우리은행",
    description: "우리 WON 깍아타기 자격인 대출",
    rate: "5.43%",
    amount: "5,010만원",
    period: "",
  },
  {
    id: 4,
    logo: "/icon/woori.png",
    name: "우리은행",
    description: "우리 주거래 직장인(이직/변경)",
    rate: "5.56%",
    amount: "2억원",
    period: "",
  },
];

export default function Loanlist() {
    const router =useRouter();
  return (
    <div className="w-full px-4">
      {DUMMY_LOANS.map((loan) => (
        <div
          key={loan.id}
          className="flex items-center justify-between p-4 bg-white border-b border-gray-200 hover:shadow-md transition cursor-pointer"
          onClick={()=>{router.push(`/loan/${loan.id}`)}}
        >
          {/* 좌측: 로고, 상품명, 설명 */}
          <div className="flex items-start gap-3 flex-1 text-left">
            {/* 로고 */}
            <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br  flex items-center justify-center text-white text-lg font-semibold">
              <img src={loan.logo}/>
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900">
                {loan.name}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {loan.description}
              </div>
            </div>
          </div>

          {/* 우측: 금리, 금액 */}
          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
            <div className="text-sm font-bold text-gray-900">{loan.rate}</div>
            <div className="text-xs text-gray-600">{loan.amount}</div>
          </div>

          {/* 화살표 */}
          <div className="shrink-0 ml-3 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
