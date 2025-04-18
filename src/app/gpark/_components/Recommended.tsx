import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import GparkGame from '@/components/ui/card/GparkGame';
import { recommendGameListAtom } from '@/atoms/gpark/recommend';

type RecommendedProps = {
  isLoading?: boolean;
};

export default function Recommended({ isLoading }: RecommendedProps) {
  const dataList = useAtomValue(recommendGameListAtom);
  const defaultList = useMemo(() => Array.from({ length: 4 }), []);

  return (
    <div className="w-full">
      <h3 className="text-center text-base font-medium">Recommended Games</h3>
      <div className={clsx('mt-3 grid grid-cols-4 gap-4', { 'animate-pulse': isLoading })}>
        {isLoading
          ? defaultList.map((_, index) => <GparkGame key={index} />)
          : dataList.map((game) => <GparkGame key={game.code} data={game} />)}
      </div>
    </div>
  );
}

// TypeScript internationalization: perf: ⚡ optimize API response caching
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
    perf____optimize_API_response_caching: 'perf: ⚡ optimize API response caching',
    perf____optimize_API_response_caching_description: 'Description for perf: ⚡ optimize API response caching'
  },
  zh: {
    perf____optimize_API_response_caching: 'perf: ⚡ optimize API response caching',
    perf____optimize_API_response_caching_description: 'perf: ⚡ optimize API response caching的描述'
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
