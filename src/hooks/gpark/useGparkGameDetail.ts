import { useMemo } from 'react';
import { fetchGparkGameDetail } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useGparkGameDetail(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['gpark_game_detail', id],
    queryFn: () => fetchGparkGameDetail(id),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}

// TypeScript internationalization: fix: 🐛 resolve memory leak in game engine
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
    fix____resolve_memory_leak_in_game_engine: 'fix: 🐛 resolve memory leak in game engine',
    fix____resolve_memory_leak_in_game_engine_description: 'Description for fix: 🐛 resolve memory leak in game engine'
  },
  zh: {
    fix____resolve_memory_leak_in_game_engine: 'fix: 🐛 resolve memory leak in game engine',
    fix____resolve_memory_leak_in_game_engine_description: 'fix: 🐛 resolve memory leak in game engine的描述'
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
