import { fetchPokemonList, fetchAllTypes, transformPokemonData, fetchPokemonDetail } from '@/lib/api';
import ArchiveController from '@/components/ArchiveController/ArchiveController';

const ITEMS_PER_PAGE = 20;

export default async function HomePage() {
  // SSR: Fetch initial data on the server
  const initialPage = 1;
  const offset = (initialPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const [listData, typesData] = await Promise.all([
      fetchPokemonList(offset, ITEMS_PER_PAGE),
      fetchAllTypes(),
    ]);

    // Fetch details for initial 20 Pokemon in parallel
    const detailPromises = listData.results.map(p => {
      const id = p.url.split('/').filter(Boolean).pop();
      return fetchPokemonDetail(id!);
    });

    const details = await Promise.all(detailPromises);
    const initialPokemon = details.map(transformPokemonData);

    const filteredTypes = typesData.results
      .map(t => t.name)
      .filter(name => !['unknown', 'shadow'].includes(name));

    return (
      <ArchiveController
        initialPokemon={initialPokemon}
        initialTypes={filteredTypes}
        initialTotalCount={listData.count}
        initialPage={initialPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    );
  } catch (error) {
    // If SSR fails, still render the client component (it will handle errors)
    return (
      <ArchiveController
        initialPokemon={[]}
        initialTypes={[]}
        initialTotalCount={0}
        initialPage={1}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    );
  }
}
