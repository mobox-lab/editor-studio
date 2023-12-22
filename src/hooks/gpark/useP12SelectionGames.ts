import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchP12GparkSelectionGameList } from '@/api';

export function useP12SelectionGames() {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_gpark_selection_game_list'],
    queryFn: () => fetchP12GparkSelectionGameList(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
