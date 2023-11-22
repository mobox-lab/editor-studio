import { fetchP12ArcadeSelectionGameList } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useP12SelectionGames() {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_arcade_selection_game_list'],
    queryFn: () => fetchP12ArcadeSelectionGameList(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
