'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import Link from 'next/link';

interface CreatureTileProps {
  entity: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: (entity: Pokemon) => void;
}

// Neon type colors for cyberpunk theme
const TYPE_COLORS: { [key: string]: { bg: string; glow: string; text: string } } = {
  normal: { bg: 'bg-slate-500/20', glow: 'shadow-slate-400/50', text: 'text-slate-300' },
  fire: { bg: 'bg-red-500/20', glow: 'shadow-red-500/50', text: 'text-red-400' },
  water: { bg: 'bg-blue-500/20', glow: 'shadow-blue-500/50', text: 'text-blue-400' },
  electric: { bg: 'bg-yellow-400/20', glow: 'shadow-yellow-400/50', text: 'text-yellow-300' },
  grass: { bg: 'bg-green-500/20', glow: 'shadow-green-500/50', text: 'text-green-400' },
  ice: { bg: 'bg-cyan-400/20', glow: 'shadow-cyan-400/50', text: 'text-cyan-300' },
  fighting: { bg: 'bg-red-700/20', glow: 'shadow-red-700/50', text: 'text-red-300' },
  poison: { bg: 'bg-purple-500/20', glow: 'shadow-purple-500/50', text: 'text-purple-400' },
  ground: { bg: 'bg-yellow-600/20', glow: 'shadow-yellow-600/50', text: 'text-yellow-400' },
  flying: { bg: 'bg-indigo-400/20', glow: 'shadow-indigo-400/50', text: 'text-indigo-300' },
  psychic: { bg: 'bg-pink-500/20', glow: 'shadow-pink-500/50', text: 'text-pink-400' },
  bug: { bg: 'bg-lime-500/20', glow: 'shadow-lime-500/50', text: 'text-lime-400' },
  rock: { bg: 'bg-yellow-700/20', glow: 'shadow-yellow-700/50', text: 'text-yellow-300' },
  ghost: { bg: 'bg-purple-700/20', glow: 'shadow-purple-700/50', text: 'text-purple-300' },
  dragon: { bg: 'bg-indigo-700/20', glow: 'shadow-indigo-700/50', text: 'text-indigo-300' },
  dark: { bg: 'bg-gray-800/20', glow: 'shadow-gray-800/50', text: 'text-gray-300' },
  steel: { bg: 'bg-gray-500/20', glow: 'shadow-gray-500/50', text: 'text-gray-300' },
  fairy: { bg: 'bg-pink-300/20', glow: 'shadow-pink-300/50', text: 'text-pink-300' },
};

export default function CreatureTile({ entity, isFavorite, onToggleFavorite, onClick }: CreatureTileProps) {
  const primaryType = entity.types[0] || 'normal';
  const typeStyle = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <div
      className="relative group transition-all duration-300 hover:scale-105 active:scale-95 animate-fadeInUp"
    >
      <div
        className={`backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-${primaryType}-500/50 hover:shadow-lg ${typeStyle.glow}`}
      >
        <div className="relative">
          <Link href={`/specimen/${entity.id}`} className="block cursor-pointer">
            <div className="aspect-square relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-4">
              {entity.imageUrl ? (
                <Image
                  src={entity.imageUrl}
                  alt={entity.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <span className="text-xs">No Image</span>
                </div>
              )}
            </div>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(entity.id);
            }}
            suppressHydrationWarning
            className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm rounded-full p-2 border border-slate-700 hover:border-red-500/50 transition-all duration-300 z-20 group/btn hover:scale-110"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite
                  ? 'fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                  : 'fill-slate-500 group-hover/btn:fill-slate-400'
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
        <Link href={`/specimen/${entity.id}`} className="block cursor-pointer">
          <div className="p-4 border-t border-slate-700/50">
            <h3 className="text-lg font-bold capitalize mb-2 text-slate-200 group-hover:text-cyan-400 transition-colors">
              {entity.name}
            </h3>
            <p className="text-xs text-slate-500 mb-3 font-mono">#{entity.id.toString().padStart(3, '0')}</p>
            <div className="flex flex-wrap gap-2">
              {entity.types.map((type) => {
                const typeStyle = TYPE_COLORS[type] || TYPE_COLORS.normal;
                return (
                  <span
                    key={type}
                    className={`${typeStyle.bg} ${typeStyle.text} text-xs font-semibold px-3 py-1 rounded-full capitalize border border-current/20 ${typeStyle.glow} shadow-sm`}
                  >
                    {type}
                  </span>
                );
              })}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
