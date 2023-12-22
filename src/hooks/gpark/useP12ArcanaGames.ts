import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchP12GparkArcanaGameList } from '@/api';

export function useP12ArcanaGames() {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_gpark_arcana_game_list'],
    queryFn: () => fetchP12GparkArcanaGameList(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
