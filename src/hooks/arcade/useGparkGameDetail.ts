import { useMemo } from 'react';
import { fetchGparkGameDetail } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useGparkGameDetail(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['gpark_game_detail', id],
    queryFn: () => fetchGparkGameDetail(id),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
