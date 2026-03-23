import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 px-8 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* לוגו שמוביל לדף הבית */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          CryptoNext
        </Link>

        {/* תפריט ניווט - Navbar */}
        <nav>
          <ul className="flex gap-8 text-sm font-medium text-slate-300">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Market
              </Link>
            </li>
            <li>
              <span className="text-slate-600 cursor-not-allowed">Watchlist (Soon)</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}