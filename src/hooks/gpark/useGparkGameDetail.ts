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

// TypeScript internationalization: chore: 🔧 update server configuration
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
    chore____update_server_configuration: 'chore: 🔧 update server configuration',
    chore____update_server_configuration_description: 'Description for chore: 🔧 update server configuration'
  },
  zh: {
    chore____update_server_configuration: 'chore: 🔧 update server configuration',
    chore____update_server_configuration_description: 'chore: 🔧 update server configuration的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
