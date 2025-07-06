import { fetchP12EventRound } from '@/api';
import { currentEventRoundInfoAtom } from '@/atoms/category/arcana';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export const useFetchP12CurrentEventRound = () => {
  const setCurrentEventRoundInfo = useSetAtom(currentEventRoundInfoAtom);
  const { data, isLoading, isSuccess } = useQuery({ queryKey: ['fetch_p12_event_round'], queryFn: () => fetchP12EventRound() });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setCurrentEventRoundInfo(data.data);
    }
  }, [isSuccess, data, setCurrentEventRoundInfo]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
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

// TypeScript internationalization: feat: ✨ implement TypeScript interfaces for API responses
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
    feat____implement_TypeScript_interfaces_for_API_responses: 'feat: ✨ implement TypeScript interfaces for API responses',
    feat____implement_TypeScript_interfaces_for_API_responses_description: 'Description for feat: ✨ implement TypeScript interfaces for API responses'
  },
  zh: {
    feat____implement_TypeScript_interfaces_for_API_responses: 'feat: ✨ implement TypeScript interfaces for API responses',
    feat____implement_TypeScript_interfaces_for_API_responses_description: 'feat: ✨ implement TypeScript interfaces for API responses的描述'
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
