import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SportStatMuse - Estatísticas de Futebol Europeu",
  description: "Busque estatísticas de futebol europeu com IA",
};

const leagues = [
  { id: 39, name: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: 140, name: "La Liga", flag: "🇪🇸" },
  { id: 135, name: "Serie A", flag: "🇮🇹" },
  { id: 78, name: "Bundesliga", flag: "🇩🇪" },
  { id: 61, name: "Ligue 1", flag: "🇫🇷" },
  { id: 2, name: "Champions League", flag: "🏆" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SportStatMuse
                </Link>
                <nav className="hidden md:flex items-center gap-1">
                  {leagues.map((league) => (
                    <Link
                      key={league.id}
                      href={`/league/${league.id}`}
                      className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      {league.flag} {league.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/search" className="px-4 py-2 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                  Busca IA
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-zinc-800 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-sm text-zinc-400">
              © 2026 SportStatMuse. Dados fornecidos por API-FOOTBALL.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
