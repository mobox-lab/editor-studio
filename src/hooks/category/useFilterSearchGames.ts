import { GparkGameItem } from '@/api';
import { useMemo } from 'react';

export function useFilterSearchGames(gameList: GparkGameItem[], searchText: string) {
  return useMemo(
    () => gameList.filter((game) => game.displayName.toLowerCase().includes(searchText.toLowerCase())),
    [gameList, searchText],
  );
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
