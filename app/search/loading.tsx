export default function SearchLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-zinc-800 rounded animate-pulse mx-auto mb-4" />
        <div className="h-6 w-96 bg-zinc-800 rounded animate-pulse mx-auto" />
      </div>
      <div className="h-14 w-full bg-zinc-800 rounded-full animate-pulse mb-8" />
      <div className="space-y-8">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                <div className="h-12 w-12 bg-zinc-800 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
