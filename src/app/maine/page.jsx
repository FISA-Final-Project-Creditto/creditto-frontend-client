'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Send,
  TrendingUp,
  Eye,
  EyeOff,
  ChevronRight,
  Wallet,
  Bell,
  Settings,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';



const exchangeRateData = [
  { date: '1월', KRW: 1200, JPY: 1000, CNY: 180 },
  { date: '2월', KRW: 1210, JPY: 1010, CNY: 185 },
  { date: '3월', KRW: 1195, JPY: 990, CNY: 175 },
  { date: '4월', KRW: 1220, JPY: 1020, CNY: 190 },
];

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const creditScore = 750;
  const maxScore = 900;
  const scorePercentage = (creditScore / maxScore) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
 

      <main className="px-4 py-4 pb-6 max-w-2xl mx-auto bg-[#e5e5e5]">
        <section className="mb-6">
          <p className="text-xs text-muted-foreground mb-1">안녕하세요</p>
          <h2 className="text-2xl font-bold text-foreground">정용준님</h2>
        </section>

      

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        

          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs text-muted-foreground font-medium mb-1">월 이용액</p>
            <h4 className="text-3xl font-bold text-foreground mb-4">₩1,240,000</h4>
            <div className="text-xs text-muted-foreground">이번 달 {3}건 사용</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition">
            <Send className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">송금</span>
          </button>
          <button className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition">
            <Wallet className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">대출</span>
          </button>
          <button className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">투자</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">추천 상품</h3>
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              더보기
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/30 dark:border-blue-800/30 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">중금리 신용대출</p>
                <p className="text-xs text-muted-foreground mt-1">연 4.5% ~ 8.9%</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-200/30 dark:border-emerald-800/30 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">적금 상품</p>
                <p className="text-xs text-muted-foreground mt-1">연 4.2% 이율</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">환율</h3>
            <button className="text-xs text-primary hover:underline">새로고침</button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { currency: 'USD', code: 'USD', rate: 1250, change: 1.2, positive: true },
              { currency: 'JPY', code: 'JPY', rate: 8.5, change: -0.5, positive: false },
              { currency: 'EUR', code: 'EUR', rate: 1380, change: 2.1, positive: true },
            ].map((item) => (
              <div key={item.currency} className="bg-card border border-border rounded-2xl p-4">
                <p className="text-xs text-muted-foreground font-medium mb-1">{item.code}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xl font-bold">₩{item.rate}</p>
                  </div>
                  <div
                    className={`text-xs font-semibold flex items-center gap-0.5 ${
                      item.positive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.positive ? '↑' : '↓'} {item.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-xs text-muted-foreground font-medium mb-3">USD 추이</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={exchangeRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="date"
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '11px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="KRW"
                  stroke="var(--color-primary)"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-6" />
      </main>
    </div>
  );
}
