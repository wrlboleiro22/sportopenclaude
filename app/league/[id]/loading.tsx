export default function LeagueLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
      </div>
      <div className="h-10 w-64 bg-zinc-800 rounded animate-pulse mb-2" />
      <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-6" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-6 w-6 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-6 flex-1 bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
