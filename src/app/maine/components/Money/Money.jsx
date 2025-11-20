'use client'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

export default function Money() {
          const [showBalance, setShowBalance] = useState(false);

  return (
      <div className="w-full bg-card border bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 border-border rounded-t-2xl h-14 flex items-center shadow justify-between px-5">
        <div className="flex items-center gap-3">
          <p className="text-base text-white font-medium">계좌잔액</p>
          <h4 className="text-base font-normal text-white">
            {showBalance ? '2,450,000 원' : '••••••'}
          </h4>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-1.5 hover:bg-white/10 rounded-lg transition"
        >
          {showBalance ? (
            <Eye className="w-4 h-4 text-white" />
          ) : (
            <EyeOff className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
  )
}
