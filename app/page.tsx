import Link from "next/link";
import { getLeagues, getTrending } from "./lib/api-football";
import LeagueCard from "../components/LeagueCard";

export async function generateMetadata() {
  return {
    title: "SportStatMuse - Estatísticas de Futebol Europeu",
    description:
      "Confira estatísticas, classificações, artilheiros e próximos jogos das principais ligas europeias de futebol.",
  };
}

export default async function Home() {
  const leagues = await getLeagues();
  const trending = await getTrending();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          SportStatMuse
        </h1>
        <p className="text-xl text-zinc-400 mb-8">
          Estatísticas de futebol europeu com busca inteligente
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar Estatísticas
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
        <h2 className="text-2xl font-bold mb-6">Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trending.map((item, i) => (
            <div key={i} className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
              <p className="text-sm text-zinc-400 mb-1">{item.category}</p>
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
