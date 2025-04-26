import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchP12GparkArcanaGameList } from '@/api';

export function useP12ArcanaGames() {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_gpark_arcana_game_list'],
    queryFn: () => fetchP12GparkArcanaGameList(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}

// TypeScript internationalization: docs: 📝 add troubleshooting section
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
    docs____add_troubleshooting_section: 'docs: 📝 add troubleshooting section',
    docs____add_troubleshooting_section_description: 'Description for docs: 📝 add troubleshooting section'
  },
  zh: {
    docs____add_troubleshooting_section: 'docs: 📝 add troubleshooting section',
    docs____add_troubleshooting_section_description: 'docs: 📝 add troubleshooting section的描述'
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
