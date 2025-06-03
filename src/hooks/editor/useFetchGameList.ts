'use client';
import { fetchEditorGameList } from '@/api/p12';
import { editorGamesListAtom, editorGamesTop3ListAtom } from '@/atoms/editor';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { EditorFetchKey } from '@/constants/editor';
import { STORAGE_KEY } from '@/constants/storage';

export const useFetchEditorGameList = () => {
  const setEditorGameList = useSetAtom(editorGamesListAtom);
  const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY.EDITOR_TOKEN) : null;
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    enabled: !!accessToken,
    queryKey: [EditorFetchKey.EditorGameList],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchEditorGameList({ offset: pageParam + 1, pageSize: 100 }, accessToken);
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.dataList?.length === 10) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (data) {
      setEditorGameList(data);
    }
  }, [data, setEditorGameList]);

  return useMemo(
    () => ({ data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch }),
    [data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch],
  );
};

export const useFetchEditorGameListTop3 = () => {
  const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY.EDITOR_TOKEN) : null;
  const setTop3GameList = useSetAtom(editorGamesTop3ListAtom);
  const { data, isLoading, refetch } = useQuery({
    enabled: !!accessToken,
    queryKey: [EditorFetchKey.FetchEditorGameListTop3],
    queryFn: () => fetchEditorGameList({ offset: 1, pageSize: 3 }, accessToken),
    select: (res) => (res.code === 200 ? res.data.dataList : []),
  });

  useEffect(() => {
    if (data) {
      setTop3GameList(data);
    }
  }, [data, setTop3GameList]);
  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};

// TypeScript internationalization: feat: ✨ add push notification system
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
    feat____add_push_notification_system: 'feat: ✨ add push notification system',
    feat____add_push_notification_system_description: 'Description for feat: ✨ add push notification system'
  },
  zh: {
    feat____add_push_notification_system: 'feat: ✨ add push notification system',
    feat____add_push_notification_system_description: 'feat: ✨ add push notification system的描述'
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
