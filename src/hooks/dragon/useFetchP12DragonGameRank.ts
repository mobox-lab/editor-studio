import { fetchDragonGameRank } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonGameRank = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_dragon_game_rank'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      let res = await fetchDragonGameRank({ page: pageParam + 1, size: 25 });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 25) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage],
  );
};

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
