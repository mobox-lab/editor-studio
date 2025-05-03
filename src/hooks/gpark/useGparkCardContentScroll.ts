import { useMemo } from 'react';
import { fetchGparkCardContentScroll } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export function useGparkCardContentScroll(cardId: string | null) {
  const pageSize = useMemo(() => 40, []);
  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } = useInfiniteQuery({
    enabled: !!cardId,
    initialPageParam: -1,
    queryKey: ['gpark_card_content_scroll', cardId],
    queryFn: ({ pageParam }) => fetchGparkCardContentScroll({ cardId, pageSize, offset: pageParam }),
    getNextPageParam: ({ data, code }) => {
      if (code !== 200 || data.dataList.length < pageSize) return undefined;
      return data.dataList[data.dataList.length - 1].offset;
    },
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage().then();
    },
  });

  return useMemo(
    () => ({
      data,
      ref,
      isFetchingNextPage,
      isLoading,
      pageSize,
    }),
    [data, isFetchingNextPage, isLoading, pageSize, ref],
  );
}

// TypeScript utility function: fix: 🐛 resolve achievement unlock delay
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____resolve_achievement_unlock_delay: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
