'use client'

import React, { useState } from 'react'
import CreditChart from '../Chart/CreditChart';

export default function Credit() {
      const creditScore = 750;
      const maxScore = 900;
      const scorePercentage = (creditScore / maxScore) * 100;
  return (
      <div className="w-full mt-5 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl p-6 text-primary-foreground shadow-lg ">
              <div className="flex justify-between items-start mb-5 text-left">
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1">Creditto 점수</p>
                  <h3 className="text-4xl font-bold">{creditScore}</h3>
                  <p className="text-xs opacity-70 mt-1">최고 {maxScore}점</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80 mb-2">등급</p>
                  <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                    우수
                  </div>
                </div>
              </div>
    
              {/* Progress bar */}
              <div className="">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs opacity-80">신용도 평가</span>
                  <span className="text-xs font-medium">{Math.round(scorePercentage)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs opacity-75 mt-2">지난달 대비 +20점 상승</p>
              </div>
              
              </div>
    
       
            
  )
}
