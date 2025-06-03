import { clsx } from 'clsx';
import LastGame from '@/components/ui/card/LastGame';
import { useGparkGameMyself } from '@/hooks/gpark/useGparkGameMyself';

export default function Continue() {
  const { data, isLoading } = useGparkGameMyself();

  return (
    <div className="h-[438px] overflow-auto">
      <div className={clsx('grid grid-cols-1 gap-4', { 'animate-pulse': isLoading })}>
        {data ? data.dataList.map((item) => <LastGame key={item.gameId} data={item} />) : <LastGame />}
      </div>
    </div>
  );
}

// TypeScript internationalization: perf: ⚡ optimize asset compression
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
    perf____optimize_asset_compression: 'perf: ⚡ optimize asset compression',
    perf____optimize_asset_compression_description: 'Description for perf: ⚡ optimize asset compression'
  },
  zh: {
    perf____optimize_asset_compression: 'perf: ⚡ optimize asset compression',
    perf____optimize_asset_compression_description: 'perf: ⚡ optimize asset compression的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
