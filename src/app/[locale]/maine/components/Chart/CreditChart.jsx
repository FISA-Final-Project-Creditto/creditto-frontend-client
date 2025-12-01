import { credittoApi } from '@/src/app/api/axios';
import React, { useEffect, useState } from 'react'
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
import { useTranslations } from 'next-intl';

export default function CreditChart() {
  const t = useTranslations('maine');
  const [historyScore , setHistoryScore] = useState();
 useEffect(() => {
    const fetchCreditScore = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("userId");

        if (!accessToken) return;

        const res = await credittoApi.get(`/api/credit-score/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        
 
        setHistoryScore(res.data.history);
        // setHistoryScore(r);
        console.log("신용점수 : ", res.data);
      } catch (error) {
        console.error("신용점수 조회 실패:", error);
      }
    };
    fetchCreditScore();
  }, []);

// 말풍선 모양의 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative">
        <div className="bg-white text-gray-800 p-3 rounded-lg shadow-lg">
          <p className="font-bold text-sm text-gray-900">{label}</p>
          <p className="text-base text-[#1A3668] font-semibold">{`${payload[0].value}${t('creditChart.score')}`}</p>
        </div>
        {/* 말풍선 꼬리 부분 */}
        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white transform rotate-45 -bottom-1"></div>
      </div>
    );
  }

  return null;
};

const creditScoreData = [
  { month: t('creditChart.month', {month: 1}), score: 400 },
  { month: t('creditChart.month', {month: 2}), score: 425 },
  { month: t('creditChart.month', {month: 3}), score: 680 },
  { month: t('creditChart.month', {month: 4}), score: 695 },
  { month: t('creditChart.month', {month: 5}), score: 400 },
  { month: t('creditChart.month', {month: 6}), score: 730 },
  { month: t('creditChart.month', {month: 7}), score: 840 },
];
  return (
          <div className="w-full mt-3 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl m-3 text-primary-foreground shadow-lg ">

              <div className="bg-white/10 backdrop-blur rounded-2xl m-3">
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={historyScore}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="month"
                      stroke="rgba(255,255,255,0.6)"
                      style={{ fontSize: '10px' }}
                    />
                    {/* 커스텀 툴팁 컴포넌트를 content로 전달 */}
                    <Tooltip cursor={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#ffffff"
                      dot={false}
                      strokeWidth={2}
                      activeDot={{
                        r: 6, // 점 크기
                        stroke: '#ffffff',
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              </div>
  )
}
