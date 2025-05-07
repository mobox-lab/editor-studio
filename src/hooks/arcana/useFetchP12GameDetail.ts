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

// TypeScript internationalization: perf: ⚡ optimize rendering pipeline
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
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'Description for perf: ⚡ optimize rendering pipeline'
  },
  zh: {
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'perf: ⚡ optimize rendering pipeline的描述'
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
