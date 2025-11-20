import React from 'react'
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
export default function CreditChart() {
const creditScoreData = [
  { month: '1월', score: 400 },
  { month: '2월', score: 425 },
  { month: '3월', score: 680 },
  { month: '4월', score: 695 },
  { month: '5월', score: 400 },
  { month: '6월', score: 730 },
  { month: '7월', score: 840 },
];
  return (
          <div className="w-full mt-3 bg-gradient-to-br from-[#1A3668] via-[#1A3668] to-[#1A3668]/80 rounded-3xl m-3 text-primary-foreground shadow-lg ">

              <div className="bg-white/10 backdrop-blur rounded-2xl m-3">
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={creditScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="month"
                      stroke="rgba(255,255,255,0.6)"
                      style={{ fontSize: '10px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#ffffff"
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              </div>
  )
}
