'use client'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

export default function Money({ accounts }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const totalBalance =
    accounts && accounts.length > 0
      ? accounts.reduce((sum, account) => sum + account.balance, 0)
      : 0;

  const formattedBalance = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(totalBalance);

  return (
    <div className="w-full bg-card border bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 border-border rounded-t-2xl h-14 flex items-center shadow justify-between px-5">
      <div className="flex items-center gap-3">
        <p className="text-base text-white font-medium">계좌잔액</p>
        <h4 className="text-base font-normal text-white">
          {accounts && accounts.length > 0
            ? isBalanceVisible ? formattedBalance : '●●●●●'
            : '계좌 연결 후 조회가능'}
        </h4>
      </div>
      <button onClick={toggleBalanceVisibility} className="p-1.5 hover:bg-white/10 rounded-lg transition text-white">
        {isBalanceVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
