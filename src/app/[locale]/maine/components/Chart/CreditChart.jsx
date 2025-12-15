import { credittoApi } from "@/src/app/api/axios";
import React, { useEffect, useState } from "react";
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
} from "recharts";
import { useTranslations } from "next-intl";

export default function CreditChart({historyScore}) {
  const t = useTranslations("maine");

  // Y축 범위 동적으로 계산 (데이터 최소/최대 ± 5%)
  const getYAxisDomain = () => {
    if (!historyScore || historyScore.length === 0) {
      return [0, 950];
    }
    const scores = historyScore.map(item => Number(item.avg_score ?? 0));
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const range = max - min;
    const margin = Math.max(range * 0.1, 10); // 최소 10점 마진
    
    return [
      Math.max(0, Math.floor(min - margin)),
      Math.min(950, Math.ceil(max + margin))
    ];
  };

  // 말풍선 모양의 커스텀 툴팁 컴포넌트
 const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative transform -translate-y-2">
        <div className="bg-white/85 backdrop-blur-xl px-3 py-2 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-white/40 flex flex-col">
          <span className="text-[11px] font-medium text-gray-600 tracking-tight">
            {label}{t("chart.month_unit")}
          </span>
          <span className="text-lg font-bold text-[#1A3668] leading-tight mt-0.5">
            {payload[0].value}
          </span>
        </div>

       <div
          className="absolute left-1/2 -top-1 w-2.5 h-2.5 
                     bg-white/85 backdrop-blur-xl border border-white/40
                     transform -translate-x-1/2 -rotate-45 
                     shadow-[0_-2px_6px_rgba(0,0,0,0.06)]"
        ></div>
      </div>
    );
  }
  return null;
};


  return (
    <div className="w-full mt-3 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl m-3 text-primary-foreground shadow-lg ">
      <div className="bg-white/10 backdrop-blur rounded-2xl m-3">
        <ResponsiveContainer width="100%" height={90}>
          <LineChart data={historyScore || []}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.6)"
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `${v}${t("chart.month_unit")}`}
            />
            <YAxis
              stroke="rgba(255,255,255,0.6)"
              style={{ fontSize: "10px" }}
              domain={getYAxisDomain()}
              type="number"
              hide={true}
            />

            <Tooltip
              cursor={{
                stroke: "rgba(255, 255, 255, 0.3)",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              content={<CustomTooltip />}
            />

            <Line
              type="monotone"
              dataKey="avg_score"
              stroke="#ffffff"
              dot={false}
              strokeWidth={2}
              activeDot={{
                r: 6,
                stroke: "#ffffff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
