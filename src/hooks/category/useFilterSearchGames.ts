import { GparkGameItem } from '@/api';
import { useMemo } from 'react';

export function useFilterSearchGames(gameList: GparkGameItem[], searchText: string) {
  return useMemo(
    () => gameList.filter((game) => game.displayName.toLowerCase().includes(searchText.toLowerCase())),
    [gameList, searchText],
  );
}
