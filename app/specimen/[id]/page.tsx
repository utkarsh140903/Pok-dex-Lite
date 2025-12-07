import { notFound } from 'next/navigation';
import { fetchPokemonDetail, transformPokemonDetailData } from '@/lib/api';
import SpecimenView from '@/components/SpecimenView/SpecimenView';

interface SpecimenPageProps {
  params: Promise<{ id: string }>;
}

export default async function SpecimenPage({ params }: SpecimenPageProps) {
  const { id } = await params;
  
  try {
    const detail = await fetchPokemonDetail(id);
    const transformedDetail = transformPokemonDetailData(detail);
    
    return <SpecimenView specimen={transformedDetail} />;
  } catch (error) {
    notFound();
  }
}
