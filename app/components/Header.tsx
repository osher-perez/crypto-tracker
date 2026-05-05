import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* צד שמאל: לוגו וסטטיסטיקה קטנה */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:rotate-12 transition-transform">
              C
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              COIN<span className="text-blue-500">TRACKER</span>
            </span>
          </Link>
          
          {/* נתון שוק "חי" (כרגע סטטי, בהמשך נחבר ל-API) */}
          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-400 border-l border-slate-700 pl-8">
            <div className="flex gap-1">
              <span>Market Cap:</span>
              <span className="text-green-400">$2.4T</span>
            </div>
            <div className="flex gap-1">
              <span>BTC Dominance:</span>
              <span className="text-orange-400">52.1%</span>
            </div>
          </div>
        </div>

        {/* צד ימין: חיפוש וניווט */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search coins..." 
              className="bg-slate-800 border border-slate-700 text-sm rounded-full px-4 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1.5 px-4 rounded-full transition-colors">
            Connect Wallet
          </button>
        </div>

      </div>
    </header>
  );
}