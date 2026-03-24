import Link from "next/link";
import { use } from "react";

// 1. הגדרת המבנה של נתוני המטבע (Interface) - לצורך ה-Miro והסדר בראש
interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    market_cap: { usd: number };
  };
  image: { large: string };
}

async function getCoinData(id: string): Promise<CoinDetail> { 
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!res.ok) throw new Error("Failed to fetch coin data");
  return res.json();
}

export default function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // חילוץ ה-ID מה-URL
  const { id } = use(params);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* כפתור חזרה - חשוב לחוויית המשתמש */}
      <Link href="/" className="text-blue-400 hover:underline mb-8 block">
        ← חזרה לרשימה
      </Link>

      <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold capitalize">{id} Details</h1>
          <span className="bg-blue-600 text-xs px-2 py-1 rounded uppercase tracking-wider">
            Live Data
          </span>
        </div>

        {/* כאן יבוא התוכן האמיתי אחרי ה-Fetch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Current Price</p>
                <p className="text-2xl font-mono">$ --,---</p>
             </div>
             {/* כאן התיבה האפורה מה-Miro: המקום לגרף */}
             <div className="h-64 bg-slate-900 rounded-lg border border-dashed border-slate-600 flex items-center justify-center text-slate-500">
                [ כאן יופיע הגרף בעתיד - Price Chart Placeholder ]
             </div>
          </div>

          <div className="space-y-4 text-slate-300">
             <h3 className="text-xl font-semibold text-white">About {id}</h3>
             <p className="leading-relaxed">
                כאן יופיע תיאור המטבע שנמשוך מה-API. בנינו את התשתית כך שנוכל להציג כאן טקסט ארוך ומפורט.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}