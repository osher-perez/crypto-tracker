"use client";
import { useState } from "react";

export default function Converter({
  price,
  symbol,
}: {
  price: number; // שים לב: שיניתי ל-number כדי שנוכל להכפיל
  symbol: string;
}) {
  // המשתנים חייבים להיות כאן בפנים!
  const [amount, setAmount] = useState(1);
  const totalPrice = amount * price;

  return (
    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-right" dir="rtl">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-slate-900 border border-slate-600 p-2 rounded text-white text-left"
        />
        <span className="font-bold text-blue-400">{symbol.toUpperCase()}</span>
      </div>
      <p className="text-lg">
        שווה ל:{" "}
        <span className="text-green-400 font-mono">
          ${totalPrice.toLocaleString()}
        </span>
      </p>
    </div>
  );
}