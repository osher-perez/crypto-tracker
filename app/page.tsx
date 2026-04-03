"use client";
import { useEffect, useState } from "react";
import CoinList from "@/components/CoinList";
import { COINGECKO_API_URL } from "@/utils/constants";
export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // 2. משתמשים במשתנה במקום במחרוזת ידנית
        const response = await fetch(COINGECKO_API_URL);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
