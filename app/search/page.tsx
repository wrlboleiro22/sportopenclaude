"use client";

import { useState } from "react";
import { searchPlayers, searchTeams } from "../lib/api-football";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const [players, teams] = await Promise.all([
        searchPlayers(query),
        searchTeams(query),
      ]);
      setResults({ players, teams });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Busca Inteligente</h1>
        <p className="text-zinc-400">
          Pesquise estatísticas de futebol europeu em linguagem natural
        </p>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Quem marcou mais gols na Premier League?"
          className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-lg focus:outline-none focus:border-blue-500 transition-colors pr-16"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Buscar"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {[
          "Artilheiros da Premier League",
          "Tabela da La Liga",
          "Próximos jogos da Champions",
          "Estatísticas do Mbappé",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setQuery(suggestion);
              handleSearch();
            }}
            className="px-4 py-2 bg-zinc-800 rounded-full text-sm hover:bg-zinc-700 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {results && (
        <div className="space-y-8">
          {results.players.length > 0 && (
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-2xl font-bold mb-6">Jogadores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.players.map((player: any) => (
                  <div key={player.player.id} className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <img src={player.player.photo} alt={player.player.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">{player.player.name}</p>
                      <p className="text-sm text-zinc-400">
                        {player.statistics?.[0]?.team?.name} • {player.statistics?.[0]?.goals?.total || 0} gols
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.teams.length > 0 && (
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
              <h2 className="text-2xl font-bold mb-6">Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.teams.map((team: any) => (
                  <div key={team.team.id} className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <img src={team.team.logo} alt={team.team.name} className="w-12 h-12 object-contain" />
                    <div>
                      <p className="font-semibold">{team.team.name}</p>
                      <p className="text-sm text-zinc-400">{team.team.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!results && !loading && (
        <div className="text-center py-12">
          <p className="text-zinc-500">
            Digite uma pergunta ou escolha uma sugestão acima
          </p>
        </div>
      )}
    </div>
  );
}
