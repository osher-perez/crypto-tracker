"use client";
import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
// הגדרת המבנה של מטבע קריפטו
interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function Home() {
  // State - המקום שבו נשמור את הנתונים שהגיעו מה-API
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // פונקציה שמביאה את הנתונים
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1",
        );
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []); // [] אומר שהפונקציה תרוץ רק פעם אחת כשהדף עולה

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Crypto Tracker Live 🚀</h1>

      {loading ? (
        <p>Loading market data...</p>
      ) : (
        <div className="mt-10 grid gap-4">
          {coins.map((coin) => (
            <CoinCard
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              price={coin.current_price}
              change={coin.price_change_percentage_24h}
            />
          ))}
        </div>
      )}
    </main>
  );
}
