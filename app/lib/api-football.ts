import type { LeagueInfo, League, StandingTeam, TopScorer, Fixture, Player, Team, TrendingItem } from "../../types/api";

const BASE_URL = "https://v3.football.api-sports.io";

function getApiKey(): string {
  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    throw new Error("API_FOOTBALL_KEY não configurada. Configure a variável de ambiente.");
  }
  return apiKey;
}

async function fetchAPI(endpoint: string, params: Record<string, string> = {}) {
  const API_KEY = getApiKey();
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": API_KEY,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  const data = await res.json();
  return data.response;
}

// Ligas principais
const LEAGUES: Record<number, LeagueInfo> = {
  39: { name: "Premier League", country: "England", season: 2024 },
  140: { name: "La Liga", country: "Spain", season: 2024 },
  135: { name: "Serie A", country: "Italy", season: 2024 },
  78: { name: "Bundesliga", country: "Germany", season: 2024 },
  61: { name: "Ligue 1", country: "France", season: 2024 },
  2: { name: "Champions League", country: "Europe", season: 2024 },
  71: { name: "Brasileirão Série A", country: "Brazil", season: 2024 },
};

export async function getLeagues(): Promise<League[]> {
  const leagues = await Promise.all(
    Object.entries(LEAGUES).map(async ([id, info]) => {
      try {
        const [leagueData, topScorer] = await Promise.all([
          fetchAPI("/leagues", { id, season: info.season.toString() }),
          fetchAPI("/players/topscorers", { league: id, season: info.season.toString() }).catch(() => []),
        ]);

        return {
          id: parseInt(id),
          name: info.name,
          season: `${info.season}`,
          logo: leagueData[0]?.league?.logo || "",
          topScorer: topScorer[0]?.player?.name || "N/A",
          leader: "N/A",
        };
      } catch {
        return {
          id: parseInt(id),
          name: info.name,
          season: `${info.season}`,
          logo: "",
          topScorer: "N/A",
          leader: "N/A",
        };
      }
    })
  );

  return leagues;
}

export async function getLeagueStandings(leagueId: number): Promise<StandingTeam[]> {
  const info = LEAGUES[leagueId as keyof typeof LEAGUES];
  if (!info) return [];

  try {
    const standings = await fetchAPI("/standings", {
      league: leagueId.toString(),
      season: info.season.toString(),
    });
    return standings[0]?.league?.standings?.[0] || [];
  } catch {
    return [];
  }
}

export async function getLeagueTopScorers(leagueId: number): Promise<TopScorer[]> {
  const info = LEAGUES[leagueId as keyof typeof LEAGUES];
  if (!info) return [];

  try {
    const scorers = await fetchAPI("/players/topscorers", {
      league: leagueId.toString(),
      season: info.season.toString(),
    });
    return scorers.slice(0, 10);
  } catch {
    return [];
  }
}

export async function getLeagueFixtures(leagueId: number, status = "NS"): Promise<Fixture[]> {
  const info = LEAGUES[leagueId as keyof typeof LEAGUES];
  if (!info) return [];

  try {
    const fixtures = await fetchAPI("/fixtures", {
      league: leagueId.toString(),
      season: info.season.toString(),
      status,
    });
    return fixtures.slice(0, 20);
  } catch {
    return [];
  }
}

export async function searchPlayers(query: string): Promise<Player[]> {
  try {
    const players = await fetchAPI("/players", {
      search: query,
      league: "39",
      season: "2024",
    });
    return players.slice(0, 10);
  } catch {
    return [];
  }
}

export async function searchTeams(query: string): Promise<Team[]> {
  try {
    const teams = await fetchAPI("/teams", { search: query });
    return teams.slice(0, 10);
  } catch {
    return [];
  }
}

export async function getTrending(): Promise<TrendingItem[]> {
  return [
    { category: "Premier League", title: "Quem marcou mais gols na temporada?" },
    { category: "La Liga", title: "Classificação atual da La Liga" },
    { category: "Serie A", title: "Artilheiros da Serie A" },
    { category: "Bundesliga", title: "Próximos jogos da Bundesliga" },
    { category: "Champions League", title: "Quem tem mais títulos da UCL?" },
    { category: "Ligue 1", title: "Estatísticas do PSG 2024/25" },
  ];
}

export { LEAGUES };
