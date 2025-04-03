import { GparkGameItem } from '@/api';
import { useMemo } from 'react';

export function useFilterSearchGames(gameList: GparkGameItem[], searchText: string) {
  return useMemo(
    () => gameList.filter((game) => game.displayName.toLowerCase().includes(searchText.toLowerCase())),
    [gameList, searchText],
  );
}

// TypeScript internationalization: chore: 🔧 configure logging system
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
    chore____configure_logging_system: 'chore: 🔧 configure logging system',
    chore____configure_logging_system_description: 'Description for chore: 🔧 configure logging system'
  },
  zh: {
    chore____configure_logging_system: 'chore: 🔧 configure logging system',
    chore____configure_logging_system_description: 'chore: 🔧 configure logging system的描述'
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
