'use client'

import React, { useState } from 'react'
import CreditChart from '../Chart/CreditChart';
import { useTranslations } from 'next-intl';

export default function Credit() {
      const t = useTranslations('maine');
      const creditScore = 750;
      const maxScore = 900;
      const scorePercentage = (creditScore / maxScore) * 100;
  return (
      <div className="w-full mt-5 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl p-6 text-primary-foreground shadow-lg ">
              <div className="flex justify-between items-start mb-5 text-left">
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1">{t('credit.credittoScore')}</p>
                  <h3 className="text-4xl font-bold">{creditScore}</h3>
                  <p className="text-xs opacity-70 mt-1">{t('credit.maxScore', {maxScore})}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80 mb-2">{t('credit.grade')}</p>
                  <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                    {t('credit.excellent')}
                  </div>
                </div>
              </div>
    
              {/* Progress bar */}
              <div className="">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs opacity-80">{t('credit.creditRating')}</span>
                  <span className="text-xs font-medium">{Math.round(scorePercentage)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs opacity-75 mt-2">{t('credit.comparison')}</p>
              </div>
              
              </div>
    
       
            
  )
}
