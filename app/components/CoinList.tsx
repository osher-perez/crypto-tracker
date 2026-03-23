'use client';
import {useState} from 'react';
import CoinCard from './CoinCard';

interface Coin{
    id: string;
    name: string;
    symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CointList({coins}:{coins: Coin[]}) {
    const [search, setSearch] = useState('');

    const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
return (
    <div className="flex flex-col items-center w-full">
      {/* שדה החיפוש עבר לכאן */}
      <div className="mb-8 w-80">
        <input
          type="text"
          placeholder="Search for a coin..."
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredCoins.length === 0 ? (
          <div className="text-center mt-10 text-slate-500">
            No coins found for "{search}"
          </div>
        ) : (
          filteredCoins.map((coin) => (
            <CoinCard 
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              price={coin.current_price}
              change={coin.price_change_percentage_24h}
            />
          ))
        )}
      </div>
    </div>
  );
}