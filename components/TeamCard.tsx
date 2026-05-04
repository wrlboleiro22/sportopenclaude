import Image from "next/image";
import type { Team } from "../types/api";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
      <Image
        src={team.team.logo}
        alt={team.team.name}
        width={48}
        height={48}
        className="object-contain"
      />
      <div>
        <p className="font-semibold">{team.team.name}</p>
        <p className="text-sm text-zinc-400">{team.team.country}</p>
      </div>
    </div>
  );
}
