import PriceChart from "@/components/PriceChart";
import Link from "next/link";
import Image from "next/image";

async function getChartData(id: string) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.prices.map((priceArr: [number, number]) => ({
      date: new Date(priceArr[0]).toLocaleDateString('en-US', { weekday: 'short' }),
      price: priceArr[1]
    }));
  } catch (e) { return null; }
}

async function getCoinData(id: string) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) { return null; }
}

export default async function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [coin, chartData] = await Promise.all([getCoinData(id), getChartData(id)]);

  if (!coin) return <div className="p-10 text-center text-white">Coin not found</div>;

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-slate-400 hover:text-white mb-8 inline-block transition-colors">
          ← Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* כרטיס נתונים שמאלי */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <Image src={coin.image.large} alt={coin.name} width={80} height={80} className="rounded-full shadow-2xl shadow-blue-500/20" />
                <div>
                  <h1 className="text-4xl font-black tracking-tight">{coin.name}</h1>
                  <span className="text-blue-500 uppercase font-bold tracking-widest text-sm">{coin.symbol}</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Current Price</p>
                  <p className="text-3xl font-mono font-bold text-white">
                    ${coin.market_data.current_price.usd.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">24h Change</p>
                  <p className={`text-xl font-bold ${coin.market_data.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* גרף ותיאור ימני */}
          <div className="lg:col-span-2 space-y-8">
            {/* אזור הגרף */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 h-80">
              <h3 className="text-slate-400 text-sm font-bold mb-4 uppercase tracking-tighter">7-Day Price Action</h3>
              <div className="h-[200px] w-full">
                <PriceChart data={chartData} />
              </div>
            </div>

            {/* אזור התיאור עם גלילה */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                About {coin.name}
              </h3>
              <div 
                className="text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700 custom-scroll"
                dangerouslySetInnerHTML={{ __html: coin.description.en }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}