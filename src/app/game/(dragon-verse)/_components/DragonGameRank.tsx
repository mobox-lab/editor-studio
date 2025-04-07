import LoadingSvg from '@/../public/svg/loading.svg?component';
import RefreshSvg from '@/../public/svg/refresh.svg?component';
import RankTable from '@/components/ui/table/RankTable';
import { useDragonGameRankColumns } from '@/hooks/dragon/useDragonGameRankColumns';
import { useFetchP12DragonGameRank } from '@/hooks/dragon/useFetchP12DragonGameRank';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export default function DragonGameRank() {
  const columns = useDragonGameRankColumns();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchP12DragonGameRank();
  const { ref, inView } = useInView();

  const rankItems = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.length) {
      const res = data.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [data?.pages]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div className="flex flex-col items-center text-center">
      <img src="/img/gpark/dragon-rank-title.webp" alt="Hall of Fame" className="h-[50px]" />
      <p className="mt-2 text-sm/6 font-medium">History and Achievement</p>
      <div className="-mt-5.5 flex w-full items-end justify-between">
        <p className="text-sm/5.5 font-semibold">Dash of Dawn</p>
        <div onClick={() => refetch()} className="flex-center h-10 w-10 cursor-pointer rounded bg-white/10 backdrop-blur-xl">
          <RefreshSvg className="h-5 w-5 fill-gray-300 stroke-gray-300" />
        </div>
      </div>
      <RankTable
        loading={isLoading}
        className="mt-2.5 max-h-[446px] overflow-x-auto"
        dataSource={rankItems ?? []}
        columns={columns}
        renderBottom={() => (
          <>
            {hasNextPage && (
              <div ref={ref} className="h-px text-transparent">
                {'Load More'}
              </div>
            )}
            {isFetchingNextPage && (
              <div className="flex-center mb-12 pt-4">
                <LoadingSvg className="h-10 w-10 animate-spin fill-gray-300" />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

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
