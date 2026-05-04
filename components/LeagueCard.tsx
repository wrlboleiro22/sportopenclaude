import Link from "next/link";
import Image from "next/image";
import type { League } from "../types/api";

export default function LeagueCard({ league }: { league: League }) {
  return (
    <Link
      href={`/league/${league.id}`}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={league.logo}
          alt={league.name}
          width={48}
          height={48}
          className="object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold">{league.name}</h3>
          <p className="text-sm text-zinc-400">{league.season}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-400">Artilheiro</p>
          <p className="font-semibold">{league.topScorer || "Carregando..."}</p>
        </div>
        <div>
          <p className="text-zinc-400">Líder</p>
          <p className="font-semibold">{league.leader || "Carregando..."}</p>
        </div>
      </div>
    </Link>
  );
}
