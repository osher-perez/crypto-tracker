"use client";
import { useEffect, useState } from "react";
import CoinList from "@/app/components/CoinList";
import Sidebar from "@/app/components/market/Sidebar"; // ייבוא הסיידבר החדש
import { COINGECKO_API_URL } from "@/utils/constants";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(COINGECKO_API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* כותרת הדף - מוצמדת לימין בגלל העברית */}
        <h1 className="text-4xl font-black mb-12 text-right">Market Overview</h1>

        {/* פריסת הגריד החדשה */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* צד ימין: הסיידבר (תופס 1 מתוך 4 עמודות) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Sidebar />
          </div>

          {/* צד שמאל: רשימת המטבעות (תופס 3 מתוך 4 עמודות) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {loading ? (
              <div className="flex justify-center p-20">
                <p className="text-xl animate-pulse">Loading market data...</p>
              </div>
            ) : (
              <div className="w-full">
                <CoinList coins={coins} />
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}