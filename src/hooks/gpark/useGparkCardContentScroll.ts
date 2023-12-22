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
