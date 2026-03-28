interface CoinProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export default function CoinCard({ name, symbol, price, change }: CoinProps) {
  const isPositive = change > 0;

  return (
    <div className="p-4 border border-slate-700 rounded-lg bg-slate-800 flex justify-between w-80 items-center">
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-slate-400">{symbol}</p>
      </div>
      <div className="text-right">
        <p className="font-mono">${price.toLocaleString()}</p>
        <p
          className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </p>
      </div>
    </div>
  );
}
