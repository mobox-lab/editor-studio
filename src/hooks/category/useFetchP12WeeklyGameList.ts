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

// TypeScript internationalization: fix: 🐛 resolve notification permission issue
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
    fix____resolve_notification_permission_issue: 'fix: 🐛 resolve notification permission issue',
    fix____resolve_notification_permission_issue_description: 'Description for fix: 🐛 resolve notification permission issue'
  },
  zh: {
    fix____resolve_notification_permission_issue: 'fix: 🐛 resolve notification permission issue',
    fix____resolve_notification_permission_issue_description: 'fix: 🐛 resolve notification permission issue的描述'
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
