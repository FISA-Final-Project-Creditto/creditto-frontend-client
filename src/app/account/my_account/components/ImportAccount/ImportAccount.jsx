"use client";
import api from "@/src/app/api/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ImportAccount() {
  const router = useRouter();
  const mock = [
    {
      accountId : 1,
      accountNo: "1810908621009",
      accountName: "테스트 계좌",
      balance: 1592000,
      accountType: "SAVINGS",
      accountState: "ACTIVE",
      userId: "2",
    },
    {
      accountId : 2,
      accountNo: "1816298859905",
      accountName: "테스트 계좌",
      balance: 12000,
      accountType: "SAVINGS",
      accountState: "ACTIVE",
      userId: "2",
    },
    {
      accountId :3,
      accountNo: "2073211213735",
      accountName: "테스트 계좌",
      balance: 3000,
      accountType: "LOAN",
      accountState: "ACTIVE",
      userId: "2",
    },
  ];

  // useEffect(()=>{
  //   const accesstoken = sessionStorage.getItem("accessToken")

  //   const res = api.get("/api/accounts/me/accounts",{accesstoken})
  //   console.log(res.data)
  // },[])

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">우리은행 예·적금</h2>

      <div className="space-y-4">
        {mock.map((mock) => (
          <div
            key={mock.accountId}
            className="bg-white border-b border-gray-200 p-2 cursor-pointer"
            onClick={() => {
              router.push(`/account/my_account/${mock.accountId}`);
            }}
          >
            <div className="flex items-start text-left gap-4 flex-1">
              <img
                src="/icon/woori.png"
                alt="우리은행 로고"
                className="w-12 h-12 rounded-full"
              />

              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-900">
                  {mock.accountName}
                </p>
                <p className="text-sm text-gray-500">{mock.accountNo}</p>
              </div>
              <button
                className={`px-3 py-1 rounded text-sm font-medium bg-gray-300 text-gray-700 flex-shrink-0 ml-2`}
              >
                {mock.accountType}
              </button>
            </div>
            <div>
              <p className="text-lg text-right font-bold text-gray-900">
                {new Intl.NumberFormat("ko-KR").format(mock.balance)}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
