import { render, screen } from "@testing-library/react";
import LeagueCard from "../components/LeagueCard";
import type { League } from "../types/api";

const mockLeague: League = {
  id: 39,
  name: "Premier League",
  season: "2024",
  logo: "https://example.com/logo.png",
  topScorer: "Haaland",
  leader: "Arsenal",
};

describe("LeagueCard", () => {
  it("renders league information correctly", () => {
    render(<LeagueCard league={mockLeague} />);

    expect(screen.getByText("Premier League")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Haaland")).toBeInTheDocument();
    expect(screen.getByText("Arsenal")).toBeInTheDocument();
  });

  it("has a link to the league page", () => {
    render(<LeagueCard league={mockLeague} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/league/39");
  });
});
