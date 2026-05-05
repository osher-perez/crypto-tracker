"use client";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/global");
        const data = await res.json();
        setStats(data.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGlobalStats();
  }, []);

  // פונקציה לעיצוב מספרים גדולים (טריליון, מיליארד)
  const formatNum = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    return num.toLocaleString();
  };

  if (loading) return <div className="animate-pulse text-slate-500">Loading Stats...</div>;
  if (!stats) return null;

  return (
    <aside className="space-y-6">
      {/* כרטיס נתוני שוק */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Market Stats</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-slate-400 text-sm">Market Cap</span>
            <span className="font-mono text-emerald-400 font-bold">
              ${formatNum(stats.total_market_cap.usd)}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-slate-400 text-sm">24h Volume</span>
            <span className="font-mono text-blue-300 font-bold">
              ${formatNum(stats.total_volume.usd)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">BTC Dominance</span>
            <span className="font-mono text-amber-400 font-bold">
              {stats.market_cap_percentage.btc.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* כרטיס מטבעות פעילים */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-lg font-bold mb-1 text-purple-400">Active Coins</h2>
        <p className="text-3xl font-black">
          {stats.active_cryptocurrencies.toLocaleString()}
        </p>
        <p className="text-slate-500 text-xs mt-2 uppercase tracking-tighter">
          Live Assets Tracked
        </p>
      </div>
    </aside>
  );
}