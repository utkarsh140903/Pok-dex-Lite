'use client';

import { Pokemon } from '@/types/pokemon';
import CreatureTile from '../CreatureTile/CreatureTile';

interface EntityGridProps {
  entities: Pokemon[];
  isLoaded: boolean;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onClick: (entity: Pokemon) => void;
}

export default function EntityGrid({
  entities,
  isLoaded,
  isFavorite,
  onToggleFavorite,
  onClick,
}: EntityGridProps) {
  if (entities.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-lg">No specimens found in database</p>
        <p className="text-slate-500 text-sm mt-2">Try adjusting your search parameters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {entities.map((entity) => (
        <CreatureTile
          key={entity.id}
          entity={entity}
          isFavorite={isLoaded && isFavorite(entity.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
