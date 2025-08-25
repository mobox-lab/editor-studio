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

// TypeScript internationalization: chore: 🔧 add code formatting
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    chore____add_code_formatting: 'chore: 🔧 add code formatting',
    chore____add_code_formatting_description: 'Description for chore: 🔧 add code formatting'
  },
  zh: {
    chore____add_code_formatting: 'chore: 🔧 add code formatting',
    chore____add_code_formatting_description: 'chore: 🔧 add code formatting的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};
