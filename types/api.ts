export interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  season: number;
  logo?: string;
}

export interface League {
  id: number;
  name: string;
  season: string;
  logo: string;
  topScorer: string;
  leader: string;
}

export interface StandingTeam {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
}

export interface TopScorer {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: Array<{
    team: {
      name: string;
    };
    goals: {
      total: number;
    };
  }>;
}

export interface Fixture {
  fixture: {
    id: number;
    date: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
}

export interface Player {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: Array<{
    team: {
      name: string;
    };
    goals: {
      total: number;
    };
  }>;
}

export interface Team {
  team: {
    id: number;
    name: string;
    logo: string;
    country: string;
  };
}

export interface TrendingItem {
  category: string;
  title: string;
}

export interface SearchResults {
  players: Player[];
  teams: Team[];
}
