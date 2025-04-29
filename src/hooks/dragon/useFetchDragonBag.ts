import { useQuery } from '@tanstack/react-query';
import { fetchDragonUserBag } from '@/api/mobox';

export function useFetchDragonBag({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_dragon_bad', address],
    queryFn: () => fetchDragonUserBag(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript internationalization: feat: ✨ create battle pass system
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
    feat____create_battle_pass_system: 'feat: ✨ create battle pass system',
    feat____create_battle_pass_system_description: 'Description for feat: ✨ create battle pass system'
  },
  zh: {
    feat____create_battle_pass_system: 'feat: ✨ create battle pass system',
    feat____create_battle_pass_system_description: 'feat: ✨ create battle pass system的描述'
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
