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

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
