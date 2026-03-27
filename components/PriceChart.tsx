"use client";
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";

const data = [
  { price: 60000 },
  { price: 61000 },
  { price: 59000 },
  { price: 62000 },
  { price: 63500 },
  { price: 63000 },
];

export default function PriceChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#60a5fa" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
