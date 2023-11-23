import { fetchP12EventRoundList } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12WeeklyGameList = (eventId?: number | null) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_p12_event_round_list', eventId],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchP12EventRoundList({ eventId, page: pageParam + 1 });
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
    () => ({ data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );
};
