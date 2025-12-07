'use client';

import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-300">
              Creature Compendium
            </h1>
            <p className="text-xs text-slate-400 mt-1">Biological Archive System</p>
          </Link>
          
          <Link
            href="/favorites"
            className="relative px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-800/70 group"
          >
            <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
