import { fetchP12GameDetail } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

type useFetchGameDetailProps = {
  id?: number | null;
  onSuccess?: (data: any) => void;
};

export const useFetchP12GameDetail = ({ id, onSuccess }: useFetchGameDetailProps) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['fetch_p12_game_detail', id],
    queryFn: () => fetchP12GameDetail(id as number),
    enabled: !!id,
    select: ({ code, data }) => (code === 200 ? data : undefined),
    gcTime: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data);
    }
  }, [isSuccess, data, onSuccess]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript internationalization: style: 💄 update theme consistency
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
    style____update_theme_consistency: 'style: 💄 update theme consistency',
    style____update_theme_consistency_description: 'Description for style: 💄 update theme consistency'
  },
  zh: {
    style____update_theme_consistency: 'style: 💄 update theme consistency',
    style____update_theme_consistency_description: 'style: 💄 update theme consistency的描述'
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
