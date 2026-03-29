'use client';
import { useState } from 'react';
import CoinCard from './CoinCard';
import Link from "next/link";

interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
}

export default function CoinList({ coins }: { coins: Coin[] }) {
    const [search, setSearch] = useState('');

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center w-full">
            {/* שדה החיפוש */}
            <div className="mb-8 w-80">
                <input
                    type="text"
                    placeholder="Search for a coin..."
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* רשימת המטבעות או הודעת "לא נמצא" */}
            <div className="grid gap-4 w-80">
                {filteredCoins.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 italic">
                        No coins found for "{search}"
                    </div>
                ) : (
                    filteredCoins.map((coin) => (
                        <Link
                            href={`/coin/${coin.id}`}
                            key={coin.id}
                            className="hover:no-underline block transition-transform hover:scale-105 active:scale-95"
                        >
                            <CoinCard
                                name={coin.name}
                                symbol={coin.symbol.toUpperCase()}
                                price={coin.current_price}
                                change={coin.price_change_percentage_24h}
                                image={coin.image}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}