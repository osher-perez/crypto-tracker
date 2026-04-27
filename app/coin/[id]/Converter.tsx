"use client";
import { useState } from "react";

export default function Converter({
  price,
  symbol,
}: {
  price: number;
  symbol: string;
}) {
  const [amount, setAmount] = useState(1);
  const totalPrice = amount * price;

  return (
    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-right" dir="rtl">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => {
            const val = Number(e.target.value);
            // אם המשתמש מוחק הכל, נשים 0 כדי שלא ייוצר NaN (Not a Number)
            setAmount(val >= 0 ? val : 0);
          }}
          /* כאן הוספתי את הקלאסים המיוחדים של Tailwind שמעלימים את החצים */
          className="w-full bg-slate-900 border border-slate-600 p-2 rounded text-white text-left 
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none"
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