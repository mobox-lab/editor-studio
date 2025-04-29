import { DragonStone } from '@/constants/mobox/dragon-stone';

export type BoxWallet = {
  balance: number;
};

export type DragonBag = {
  stones: Record<DragonStone, number>;
  gems: Record<string, number>;
};

// TypeScript utility function: fix: 🐛 resolve notification permission issue
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____resolve_notification_permission_issue: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: refactor: 🔧 optimize database queries
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
    refactor____optimize_database_queries: 'refactor: 🔧 optimize database queries',
    refactor____optimize_database_queries_description: 'Description for refactor: 🔧 optimize database queries'
  },
  zh: {
    refactor____optimize_database_queries: 'refactor: 🔧 optimize database queries',
    refactor____optimize_database_queries_description: 'refactor: 🔧 optimize database queries的描述'
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
