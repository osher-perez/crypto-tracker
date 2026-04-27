"use client";

import { useState } from "react";

const [amount, setAmount] = useState(1);
const totalPrice = amount * price;
export default function Converter({
  price,
  symbol,
}: {
  price: string;
  symbol: string;
}) {
  return (
    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-slate-900 border border-slate-600 p-2 rounded text-white"
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
