/* eslint-disable @next/next/no-img-element */
interface CoinProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  image: string; // הוספנו תמונה
}

export default function CoinCard({ name, symbol, price, change, image }: CoinProps) {
  const isPositive = change > 0;

  return (
    <div className="p-4 border border-slate-700 rounded-lg bg-slate-800 flex justify-between w-80 items-center hover:border-blue-500 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        {/* הוספת לוגו המטבע */}
        <img src={image} alt={name} className="w-8 h-8 rounded-full" />
        <div>
          <h3 className="font-bold text-white leading-tight">{name}</h3>
          <p className="text-sm text-slate-400 uppercase leading-tight">{symbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-mono text-white">${price.toLocaleString()}</p>
        <p className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}