"use client";

import { useEffect } from "react";

export default function LeagueError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <p className="text-zinc-400 mb-6">
        Não foi possível carregar os dados da liga. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-500 rounded-full font-semibold hover:bg-blue-600 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
