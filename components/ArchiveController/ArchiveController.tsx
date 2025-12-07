'use client';

import { useState, useEffect, useMemo } from 'react';
import { Pokemon, PokemonDetail as PokemonDetailType } from '@/types/pokemon';
import {
  fetchPokemonList,
  fetchPokemonDetail,
  fetchPokemonByType,
  transformPokemonData,
  transformPokemonDetailData,
} from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';
import Header from '@/components/HUD/Header';
import SearchBar from '@/components/HUD/SearchBar';
import PaginationControls from '@/components/HUD/PaginationControls';
import EntityGrid from '@/components/GridSystem/EntityGrid';
import DataModal from '@/components/DataModal/DataModal';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useRouter } from 'next/navigation';

interface ArchiveControllerProps {
  initialPokemon: Pokemon[];
  initialTypes: string[];
  initialTotalCount: number;
  initialPage: number;
  itemsPerPage: number;
}

export default function ArchiveController({
  initialPokemon,
  initialTypes,
  initialTotalCount,
  initialPage,
  itemsPerPage,
}: ArchiveControllerProps) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'name' | 'id'>('name');
  const [selectedType, setSelectedType] = useState<string>('');
  const [types] = useState<string[]>(initialTypes);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetailType | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (selectedType) {
      loadPokemonByType(selectedType);
    } else if (currentPage !== initialPage || pokemon.length === 0) {
      loadPokemon(currentPage);
    }
  }, [currentPage, selectedType]);

  const loadPokemon = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const offset = (page - 1) * itemsPerPage;
      const data = await fetchPokemonList(offset, itemsPerPage);
      setTotalCount(data.count);

      const detailPromises = data.results.map(p => {
        const id = p.url.split('/').filter(Boolean).pop();
        return fetchPokemonDetail(id!);
      });

      const details = await Promise.all(detailPromises);
      const transformedPokemon = details.map(transformPokemonData);
      setPokemon(transformedPokemon);
    } catch (err: unknown) {
      const errorMessage = (err as Error)?.message || 'Failed to load specimens';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadPokemonByType = async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonByType(type);
      
      const pokemonList = data.pokemon.slice(0, 100);
      const detailPromises = pokemonList.map(p => {
        const id = p.pokemon.url.split('/').filter(Boolean).pop();
        return fetchPokemonDetail(id!);
      });

      const details = await Promise.all(detailPromises);
      const transformedPokemon = details.map(transformPokemonData);
      setPokemon(transformedPokemon);
      setTotalCount(transformedPokemon.length);
    } catch (err: unknown) {
      const errorMessage = (err as Error)?.message || 'Failed to load specimens by type';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (query: string) => {
    if (!query.trim()) return;

    if (searchMode === 'id') {
      // Direct API hit for ID search
      try {
        setLoading(true);
        setError(null);
        const detail = await fetchPokemonDetail(query);
        const transformed = transformPokemonData(detail);
        setPokemon([transformed]);
        setTotalCount(1);
        setSelectedType('');
      } catch (err: unknown) {
        setError(`Specimen with ID "${query}" not found`);
        setPokemon([]);
      } finally {
        setLoading(false);
      }
    } else {
      // Name search - try exact match first
      try {
        setLoading(true);
        setError(null);
        const detail = await fetchPokemonDetail(query.toLowerCase());
        const transformed = transformPokemonData(detail);
        setPokemon([transformed]);
        setTotalCount(1);
        setSelectedType('');
      } catch (err: unknown) {
        // If exact match fails, fall back to client-side filtering
        setError(null);
        const filtered = pokemon.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length === 0) {
          setError(`No specimens found matching "${query}"`);
        } else {
          setPokemon(filtered);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEntityClick = async (entity: Pokemon) => {
    router.push(`/specimen/${entity.id}`);
  };

  const filteredPokemon = useMemo(() => {
    if (searchMode === 'id' || searchQuery.trim() === '') {
      return pokemon;
    }
    return pokemon.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pokemon, searchQuery, searchMode]);

  const totalPages = selectedType ? 1 : Math.ceil(totalCount / itemsPerPage);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          searchMode={searchMode}
          onModeChange={setSearchMode}
        />

        <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 mb-6 mt-6">
          <label htmlFor="type-filter" className="block text-sm font-medium text-slate-300 mb-2">
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            suppressHydrationWarning
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all capitalize"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>

        {error && <Error message={error} onRetry={() => loadPokemon(currentPage)} />}

        {loading ? (
          <Loading />
        ) : (
          <>
            <EntityGrid
              entities={filteredPokemon}
              isLoaded={isLoaded}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onClick={handleEntityClick}
            />

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage(p => Math.max(1, p - 1))}
              onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={!!selectedType}
            />
          </>
        )}
      </div>
    </main>
  );
}
