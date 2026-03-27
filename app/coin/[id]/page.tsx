import Link from "next/link";
import PriceChart from "@/components/PriceChart";

async function getCoinData(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    { next: { revalidate: 60 } }, // בונוס: רענון נתונים כל דקה
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // תיקון השגיאה: מחלצים את ה-id בעזרת await פשוט במקום Hook
  const { id } = await params;
  const coin = await getCoinData(id);

  if (!coin) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
        <p className="mb-4">Coin not found.</p>
        <Link href="/" className="text-blue-400 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 mb-8 inline-block transition-colors font-medium"
        >
          ← Back to Market Overview
        </Link>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center gap-6 mb-10">
            <img
              src={coin.image.large}
              alt={coin.name}
              className="w-16 h-16 shadow-lg rounded-full"
            />
            <div>
              <h1 className="text-5xl font-black capitalize tracking-tight">
                {coin.name}{" "}
                <span className="text-slate-500 text-2xl uppercase">
                  {coin.symbol}
                </span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2 font-bold">
                  Current Price (USD)
                </p>
                <p className="text-4xl font-mono font-bold text-emerald-400">
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </p>
                <div
                  className={`mt-2 text-sm font-bold ${coin.market_data.price_change_percentage_24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}
                >
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  (24h)
                </div>
              </div>

              <div className="h-64 bg-slate-900/50 rounded-2xl border border-slate-700 p-4">
                <PriceChart />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b border-slate-700 pb-2">
                About {coin.name}
              </h3>
              <div
                className="text-slate-300 leading-relaxed text-sm max-h-100 overflow-y-auto pr-4 custom-scrollbar"
                dangerouslySetInnerHTML={{
                  __html: coin.description.en || "No description available.",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
