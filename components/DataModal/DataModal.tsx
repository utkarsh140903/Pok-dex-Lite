'use client';

import type { PokemonDetail } from '@/types/pokemon';
import Image from 'next/image';
import { useEffect } from 'react';

interface DataModalProps {
  specimen: PokemonDetail;
  onClose: () => void;
}

// Neon type colors matching CreatureTile
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

export default function DataModal({ specimen, onClose }: DataModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const primaryType = specimen.types[0] || 'normal';
  const typeStyle = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`backdrop-blur-xl bg-slate-900/90 border-2 border-slate-700/50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp ${typeStyle.glow}`}
        onClick={(e) => e.stopPropagation()}
      >
          <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 p-4 flex justify-between items-center z-10">
            <h2 className="text-2xl md:text-3xl font-bold capitalize bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {specimen.name}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-red-400 transition-colors p-2 hover:bg-slate-800 rounded-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="shrink-0 w-full md:w-64">
                <div className="aspect-square relative bg-linear-to-br from-slate-800/60 to-slate-900/80 rounded-xl p-4 border border-slate-700/50">
                  {specimen.imageUrl && (
                    <Image
                      src={specimen.imageUrl}
                      alt={specimen.name}
                      fill
                      className="object-contain p-4"
                      sizes="256px"
                    />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-sm text-slate-400 mb-2 font-mono">#{specimen.id.toString().padStart(3, '0')}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {specimen.types.map((type) => {
                      const typeStyle = TYPE_COLORS[type] || TYPE_COLORS.normal;
                      return (
                        <span
                          key={type}
                          className={`${typeStyle.bg} ${typeStyle.text} text-sm font-semibold px-4 py-2 rounded-full capitalize border border-current/20 ${typeStyle.glow} shadow-sm`}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Height</p>
                    <p className="text-lg font-semibold text-slate-200">{(specimen.height / 10).toFixed(1)} m</p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Weight</p>
                    <p className="text-lg font-semibold text-slate-200">{(specimen.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-slate-200">Abilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {specimen.abilities.map((ability) => (
                      <span
                        key={ability}
                        className="bg-slate-800/60 text-slate-300 text-sm px-3 py-1 rounded-lg capitalize border border-slate-700/50"
                      >
                        {ability.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-slate-200">Base Stats</h3>
              <div className="space-y-3">
                {Object.entries(specimen.stats).map(([stat, value]) => (
                  <div key={stat}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-400 capitalize">
                        {stat.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-semibold text-cyan-400">{value}</span>
                    </div>
                    <div className="w-full bg-slate-800/60 rounded-full h-2 border border-slate-700/50">
                      <div
                        className="bg-linear-to-r from-cyan-500 to-blue-500 h-2 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-800 ease-out"
                        style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
