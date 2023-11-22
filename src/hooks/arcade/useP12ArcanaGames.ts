import { fetchP12ArcadeArcanaGameList } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useP12ArcanaGames() {
  const { data, isLoading } = useQuery({
    queryKey: ['gpark_game_room_list'],
    queryFn: () => fetchP12ArcadeArcanaGameList(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
