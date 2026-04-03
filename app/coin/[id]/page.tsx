/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// פונקציה למשיכת נתונים כלליים על המטבע
async function getCoinData(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return null;
  return res.json();
}

// פונקציה חדשה: משיכת היסטוריה של 7 ימים לניתוח
async function getHistory(id: string) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`,
      { next: { revalidate: 3600 } }, // היסטוריה מתעדכנת פחות בתכיפות
    );
    if (!res.ok) return null;
    const data = await res.json();
    // מחלצים רק את מחירי הסגירה היומיים
    return data.prices.map((p: [number, number]) => p[1]);
  } catch (error) {
    console.error("History fetch failed:", error);
    return null;
  }
}

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // הרצת שתי הבקשות במקביל לביצועים טובים יותר
  const [coin, history] = await Promise.all([getCoinData(id), getHistory(id)]);

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

  // לוגיקת ניתוח נתונים (The "Brain")
  const currentPrice = coin.market_data.current_price.usd;
  let recommendation = "Neutral";
  let diffPercent = 0;
  const amountToConvert = 1;
  const convertedValue = amountToConvert * currentPrice;
  const oneDollarInCoin = currentPrice / 1; // כמה יחידות של המטבע שווה 1 דולר

  if (history && history.length > 0) {
    const avgPrice =
      history.reduce((a: number, b: number) => a + b, 0) / history.length;
    diffPercent = ((currentPrice - avgPrice) / avgPrice) * 100;

    if (diffPercent < -5) recommendation = "Buy Opportunity";
    else if (diffPercent > 5) recommendation = "Take Profit / High Risk";
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
              {/* כרטיס מחיר נוכחי */}
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

              {/* התיבה החדשה: ניתוח החלטות (Analysis Box) */}
              <div className="bg-slate-900/50 p-8 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center text-center">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 font-bold">
                  7-Day Trend Analysis
                </p>
                <div
                  className={`text-2xl font-black mb-2 ${diffPercent < -5 ? "text-emerald-400" : "text-amber-400"}`}
                >
                  {recommendation}
                </div>
                <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-blue-500/20 shadow-xl shadow-blue-500/5 p-6 rounded-2xl">
                  <h3 className="text-sm font-medium text-slate-400 mb-2">
                    Quick Converter
                    <input
                      type="number"
                      defaultValue={amountToConvert}
                      className="w-24 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white mr-2"
                    />
                    <p className="text-xs text-slate-500 mt-2 italic">
                      1 USD = {oneDollarInCoin.toFixed(8)}{" "}
                      {coin.symbol.toUpperCase()}
                    </p>
                  </h3>

                  <p className="text-xl font-mono text-white">
                    {amountToConvert} {coin.symbol.toUpperCase()} =
                    <span className="text-blue-400 ml-2">
                      ${convertedValue.toLocaleString()}
                    </span>
                  </p>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Price is{" "}
                  <span className="text-white font-bold">
                    {Math.abs(diffPercent).toFixed(1)}%
                  </span>
                  {diffPercent < 0 ? " lower " : " higher "}
                  than the weekly average.
                </p>
              </div>
            </div>

            {/* תיאור המטבע */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b border-slate-700 pb-2">
                About {coin.name}
              </h3>
              <div
                className="text-slate-300 leading-relaxed text-sm max-h-80 overflow-y-auto pr-4 custom-scrollbar"
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
