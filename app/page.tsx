import CoinCard from "./components/CoinCard";
// הגדרת המבנה של מטבע קריפטו
interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

// נתונים זמניים (Hardcoded) כדי לבנות את ה-UI
const MOCK_COINS: Coin[] = [
  { id: "1", name: "Bitcoin", symbol: "BTC", price: 65000, change24h: 2.5 },
  { id: "2", name: "Ethereum", symbol: "ETH", price: 3500, change24h: -1.2 },
  { id: "3", name: "Solana", symbol: "SOL", price: 145, change24h: 5.8 },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Crypto Tracker 🚀</h1>
      <p className="text-xl text-slate-400">
        Tracking your favorite coins, one commit at a time.
      </p>

      <div className="mt-10 grid gap-4">
        {MOCK_COINS.map((coin) => (
          <CoinCard
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.price}
            change={coin.change24h}
          />
        ))}
      </div>
    </main>
  );
}
