'use client'
import { Send, TrendingUp, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function FunctionButton() {
  const router = useRouter();
  return (
    
        <div className=" w-full flex flex-row mb-4 ">

          <button className="w-full flex justify-center flex-row bg-card border border-border rounded-bl-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4 "
          onClick={()=>{router.push('/loan')}}>
            <Wallet className="w-6 h-6 text-primary " />
            <span className="text-xs font-medium">대출</span>
          </button>
          <button className="w-full flex justify-center flex-row bg-card border border-border rounded-br-2xl p-2 flex flex-col items-center gap-2 hover:bg-muted transition mb-4"
          onClick={()=>{router.push('/credit/first')}}>
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">신용 점수</span>
          </button>
        </div>
  )
}
