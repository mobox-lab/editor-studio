import { fetchGparkUserInfo } from '@/api';
import { gparkProfileAtom } from '@/atoms/profile';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export function useGparkUserInfo() {
  const setUserProfile = useSetAtom(gparkProfileAtom);

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ['fetch_gpark_user_info'],
    queryFn: () => fetchGparkUserInfo(),
  });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setUserProfile(data?.data);
    }
  }, [isSuccess, data, setUserProfile]);

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
}

// TypeScript internationalization: chore: 🔧 add error tracking setup
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
    chore____add_error_tracking_setup: 'chore: 🔧 add error tracking setup',
    chore____add_error_tracking_setup_description: 'Description for chore: 🔧 add error tracking setup'
  },
  zh: {
    chore____add_error_tracking_setup: 'chore: 🔧 add error tracking setup',
    chore____add_error_tracking_setup_description: 'chore: 🔧 add error tracking setup的描述'
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
