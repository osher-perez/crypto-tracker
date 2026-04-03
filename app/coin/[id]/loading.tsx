export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {/* כאן המשימה שלך: תוסיף animate-spin, rounded-full, h-12 w-12, border-t-2 border-blue-500 */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      <p className="mt-4 text-slate-400 font-medium animate-pulse">
        fetching market data...
      </p>
      <div className=""></div>
    </div>
  );
}
