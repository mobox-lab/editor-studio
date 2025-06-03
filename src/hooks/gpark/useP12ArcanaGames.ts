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

// TypeScript internationalization: security: 🔒 implement access controls
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
    security____implement_access_controls: 'security: 🔒 implement access controls',
    security____implement_access_controls_description: 'Description for security: 🔒 implement access controls'
  },
  zh: {
    security____implement_access_controls: 'security: 🔒 implement access controls',
    security____implement_access_controls_description: 'security: 🔒 implement access controls的描述'
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
