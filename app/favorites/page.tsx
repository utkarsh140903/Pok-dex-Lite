'use client';

import { useState, useEffect, useMemo } from 'react';
import { Pokemon } from '@/types/pokemon';
import { fetchPokemonDetail, transformPokemonData } from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';
import Header from '@/components/HUD/Header';
import EntityGrid from '@/components/GridSystem/EntityGrid';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const { favorites, isFavorite, isLoaded, toggleFavorite } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const loadFavoritePokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const detailPromises = favorites.map(id => fetchPokemonDetail(id));
      const details = await Promise.all(detailPromises);
      const transformedPokemon = details.map(transformPokemonData);
      setFavoritePokemon(transformedPokemon);
    } catch (err: unknown) {
      const errorMessage = (err as Error)?.message || 'Failed to load favorites';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    
    if (favorites.length === 0) {
      setFavoritePokemon([]);
      setLoading(false);
      return;
    }

    // Optimistically update: if we have favoritePokemon loaded, filter immediately when items are removed
    if (favoritePokemon.length > 0) {
      const updatedPokemon = favoritePokemon.filter(p => favorites.includes(p.id));
      // If items were removed, update immediately (optimistic update)
      if (updatedPokemon.length < favoritePokemon.length) {
        setFavoritePokemon(updatedPokemon);
      }
      // If we're missing some favorites (new ones added), reload to fetch them
      const loadedIds = new Set(favoritePokemon.map(p => p.id));
      const missingIds = favorites.filter(id => !loadedIds.has(id));
      if (missingIds.length > 0) {
        loadFavoritePokemon();
      }
    } else {
      // Initial load
      loadFavoritePokemon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, isLoaded]);

  const filteredFavorites = useMemo(() => {
    return favoritePokemon.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [favoritePokemon, searchQuery]);

  const handleEntityClick = (entity: Pokemon) => {
    router.push(`/specimen/${entity.id}`);
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-200 mb-2">Favorites Archive</h2>
          <p className="text-slate-400">Your curated specimen collection</p>
        </div>

        {favorites.length === 0 && isLoaded ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-2">No favorites yet</p>
            <p className="text-slate-500 text-sm">Start adding specimens to your collection</p>
          </div>
        ) : (
          <>
            <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 mb-6">
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {error && <Error message={error} onRetry={loadFavoritePokemon} />}

            {loading ? (
              <Loading />
            ) : (
              <EntityGrid
                entities={filteredFavorites}
                isLoaded={isLoaded}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onClick={handleEntityClick}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
