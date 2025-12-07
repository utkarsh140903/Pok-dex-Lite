import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'pokedex_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // SSR hydration issue fix - localStorage sirf client side pe available hai
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // isLoaded check important hai warna SSR pe error aayega
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (pokemonId: number) => {
    setFavorites(prev => 
      prev.includes(pokemonId)
        ? prev.filter(id => id !== pokemonId)
        : [...prev, pokemonId]
    );
  };

  const isFavorite = (pokemonId: number) => favorites.includes(pokemonId);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
