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
  const [search, setSearch] = useState("");


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
const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase()) ||
  coin.symbol.toLowerCase().includes(search.toLowerCase())
);
 return (
  <main className="flex min-h-screen flex-col items-center p-24 bg-slate-900 text-white">
    <h1 className="text-4xl font-bold mb-8">Crypto Tracker Live 🚀</h1>
    
    {/* 3. שדה החיפוש */}
    <div className="mb-8 w-80">
      <input
        type="text"
        placeholder="Search for a coin..."
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {loading ? (
      <p>Loading market data...</p>
    ) : (
      <div className="grid gap-4">
        {/* 4. שים לב: אנחנו עוברים עכשיו על ה-filteredCoins ולא על ה-coins המקורי */}
        {filteredCoins.map((coin) => (
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
)};