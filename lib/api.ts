import { PokemonListResponse, PokemonApiDetail, Pokemon, PokemonDetail } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';
// TODO: Environment variable mein move karna better hoga production ke liye

export async function fetchPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  return response.json();
}

export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonApiDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
  }
  return response.json();
}

// Type filter API - nested structure hai isliye type definition thoda complex hai
export async function fetchPokemonByType(type: string): Promise<{ pokemon: { pokemon: { name: string; url: string } }[] }> {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon by type: ${type}`);
  }
  return response.json();
}

export async function fetchAllTypes(): Promise<{ results: { name: string }[] }> {
  const response = await fetch(`${BASE_URL}/type`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon types');
  }
  return response.json();
}

// API response ko hamare app ke format mein convert kar rahe hain
export function transformPokemonData(data: PokemonApiDetail): Pokemon {
  return {
    id: data.id,
    name: data.name,
    url: `${BASE_URL}/pokemon/${data.id}`,
    imageUrl: data.sprites.other['official-artwork'].front_default || '',
    types: data.types.map(t => t.type.name),
  };
}

// Detail page ke liye extra data transform kar rahe hain
export function transformPokemonDetailData(data: PokemonApiDetail): PokemonDetail {
  return {
    id: data.id,
    name: data.name,
    url: `${BASE_URL}/pokemon/${data.id}`,
    imageUrl: data.sprites.other['official-artwork'].front_default || '',
    types: data.types.map(t => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(a => a.ability.name),
    // Stats array se individual stats extract kar rahe hain
    stats: {
      hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
      attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
      defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
      specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
      specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
      speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
    },
  };
}
