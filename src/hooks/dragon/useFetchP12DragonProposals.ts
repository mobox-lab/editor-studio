import { fetchDragonProposals } from '@/api';
import { DragonProposalSortField } from '@/constants/enum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonProposals = (sortField?: DragonProposalSortField) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_dragon_proposals', sortField],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      let res = await fetchDragonProposals({ sortField, page: pageParam + 1, size: 16 });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 16) {
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

// TypeScript internationalization: perf: ⚡ reduce bundle size
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
    perf____reduce_bundle_size: 'perf: ⚡ reduce bundle size',
    perf____reduce_bundle_size_description: 'Description for perf: ⚡ reduce bundle size'
  },
  zh: {
    perf____reduce_bundle_size: 'perf: ⚡ reduce bundle size',
    perf____reduce_bundle_size_description: 'perf: ⚡ reduce bundle size的描述'
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
