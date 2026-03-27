'use client';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';

// הגדרת סוג הנתונים ל-TypeScript
interface ChartProps {
  data: { date: string; price: number }[] | null;
}

export default function PriceChart({ data }: ChartProps) {
  if (!data) return <div className="text-slate-500">Loading chart...</div>;

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* הוספנו ציר X כדי לראות ימים */}
          <XAxis dataKey="date" hide /> 
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#60a5fa' }}
            labelStyle={{ display: 'none' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={false} 
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}