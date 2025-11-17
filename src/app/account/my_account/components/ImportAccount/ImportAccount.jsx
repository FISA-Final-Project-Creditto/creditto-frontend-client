'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ImportAccount() {
    const router = useRouter();
  const accounts = [
    {
      id: 1,
      bank: "우리포춘 외국인 통장",
      accountNumber: "우리 012-3456-7894",
      balance: "12,345,600원",
      status: "제한 계좌",
      statusColor: "bg-gray-300 text-gray-700",
      showButton: false,
      bankPath: "/icon/woori.png",
    },
    {
      id: 2,
      bank: "두드림 통장",
      accountNumber: "우리 012-4593-3323",
      balance: "2,000,000원",
      status: "등록 불가",
      statusColor: "bg-gray-700 text-white",
      showButton: true,
      bankPath: "/icon/woori.png",
    },
  ];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">우리은행 예·적금</h2>
      
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className={account.showButton ? "bg-gray-100 rounded-lg p-4" : "bg-white border-b border-gray-200  p-2"}
          onClick={()=>{router.push(`/account/my_account/${account.id}`)}}>
            <div className="flex items-start text-left gap-4 flex-1">
              <img src={account.bankPath} className="w-12 h-12 rounded-full" />

              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-900">{account.bank}</p>
                <p className="text-sm text-gray-500">
                  {account.accountNumber}
                </p>
                
            </div>
            <button className={`px-3 py-1 rounded text-sm font-medium ${account.statusColor} flex-shrink-0 ml-2`}>
              {account.status}
            </button>
            </div>
            <div>
                <p className="text-lg text-right font-bold text-gray-900">
                  {account.balance}
                </p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}