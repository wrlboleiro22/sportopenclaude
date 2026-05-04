import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl text-zinc-400 mb-8">Página não encontrada</p>
      <p className="text-zinc-500 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
