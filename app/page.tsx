"use client";
import { useEffect, useState } from "react";
import CoinList from "@/components/CoinList";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      );
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="p-24 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Market Overview</h1>
        {loading ? <p>Loading...</p> : <CoinList coins={coins} />}
      </div>
    </main>
  );
}
