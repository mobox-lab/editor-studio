import { GparkGameItem } from '@/api';
import { useMemo } from 'react';

export function useFilterSearchGames(gameList: GparkGameItem[], searchText: string) {
  return useMemo(
    () => gameList.filter((game) => game.displayName.toLowerCase().includes(searchText.toLowerCase())),
    [gameList, searchText],
  );
}

// TypeScript internationalization: test: 🧪 add network failure tests
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
    test____add_network_failure_tests: 'test: 🧪 add network failure tests',
    test____add_network_failure_tests_description: 'Description for test: 🧪 add network failure tests'
  },
  zh: {
    test____add_network_failure_tests: 'test: 🧪 add network failure tests',
    test____add_network_failure_tests_description: 'test: 🧪 add network failure tests的描述'
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
