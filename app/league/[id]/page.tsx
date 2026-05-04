import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLeagueStandings, getLeagueTopScorers, getLeagueFixtures, LEAGUES } from "../../lib/api-football";

interface LeaguePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LeaguePageProps) {
  const { id } = await params;
  const leagueId = parseInt(id);
  const leagueInfo = LEAGUES[leagueId as keyof typeof LEAGUES];

  if (!leagueInfo) {
    return {
      title: "Liga não encontrada - SportStatMuse",
    };
  }

  return {
    title: `${leagueInfo.name} ${leagueInfo.season} - SportStatMuse`,
    description: `Classificação, artilheiros e próximos jogos da ${leagueInfo.name} temporada ${leagueInfo.season}.`,
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { id } = await params;
  const leagueId = parseInt(id);

  if (!LEAGUES[leagueId as keyof typeof LEAGUES]) {
    notFound();
  }

  const [standings, topScorers, fixtures] = await Promise.all([
    getLeagueStandings(leagueId),
    getLeagueTopScorers(leagueId),
    getLeagueFixtures(leagueId),
  ]);

  const leagueInfo = LEAGUES[leagueId as keyof typeof LEAGUES];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
          ← Voltar
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2">{leagueInfo.name}</h1>
      <p className="text-zinc-400 mb-8">Temporada {leagueInfo.season}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tabela de Classificação</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-center p-2">J</th>
                    <th className="text-center p-2">V</th>
                    <th className="text-center p-2">E</th>
                    <th className="text-center p-2">D</th>
                    <th className="text-center p-2">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, i) => (
                    <tr key={team.team.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="p-2 font-semibold">{i + 1}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-3">
                          <Image src={team.team.logo} alt={team.team.name} width={24} height={24} className="object-contain" />
                          <span>{team.team.name}</span>
                        </div>
                      </td>
                      <td className="text-center p-2">{team.all.played}</td>
                      <td className="text-center p-2">{team.all.win}</td>
                      <td className="text-center p-2">{team.all.draw}</td>
                      <td className="text-center p-2">{team.all.lose}</td>
                      <td className="text-center p-2 font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-bold mb-6">Próximos Jogos</h2>
              <div className="space-y-4">
                {fixtures.map((fixture) => (
                  <div key={fixture.fixture.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image src={fixture.teams.home.logo} alt={fixture.teams.home.name} width={32} height={32} className="object-contain" />
                      <span className="font-semibold">{fixture.teams.home.name}</span>
                    </div>
                    <span className="text-zinc-400">vs</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{fixture.teams.away.name}</span>
                      <Image src={fixture.teams.away.logo} alt={fixture.teams.away.name} width={32} height={32} className="object-contain" />
                    </div>
                    <span className="text-sm text-zinc-400">
                      {new Date(fixture.fixture.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
          </div>
        </div>

        <div>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Artilheiros</h2>
            <div className="space-y-4">
              {topScorers.map((scorer, i) => (
                <div key={scorer.player.id} className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-zinc-600 w-8">{i + 1}</span>
                  <Image src={scorer.player.photo} alt={scorer.player.name} width={40} height={40} className="rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{scorer.player.name}</p>
                    <p className="text-xs text-zinc-400">{scorer.statistics[0].team.name}</p>
                  </div>
                  <span className="font-bold text-lg">{scorer.statistics[0].goals.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(LEAGUES).map((id) => ({
    id: id,
  }));
}
