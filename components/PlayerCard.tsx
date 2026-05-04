import Image from "next/image";
import type { Player } from "../types/api";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
      <Image
        src={player.player.photo}
        alt={player.player.name}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{player.player.name}</p>
        <p className="text-sm text-zinc-400">
          {player.statistics?.[0]?.team?.name} •{" "}
          {player.statistics?.[0]?.goals?.total || 0} gols
        </p>
      </div>
    </div>
  );
}
