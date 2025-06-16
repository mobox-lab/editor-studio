export type GameListBodyType = {
  pageSize: number;
  offset: number;
};

export type GameListType = {
  totalCount: number;
  dataList: DataListType[];
};

export type DataListType = {
  cover: string;
  icon: string;
  name: string;
  state: number;
  version: string;
  channel: number;
  sourceGameId: string;
  gameCode: string;
  latestVersion: string;
};

// TypeScript internationalization: feat: ✨ add TypeScript support for better type safety
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
    feat____add_TypeScript_support_for_better_type_safety: 'feat: ✨ add TypeScript support for better type safety',
    feat____add_TypeScript_support_for_better_type_safety_description: 'Description for feat: ✨ add TypeScript support for better type safety'
  },
  zh: {
    feat____add_TypeScript_support_for_better_type_safety: 'feat: ✨ add TypeScript support for better type safety',
    feat____add_TypeScript_support_for_better_type_safety_description: 'feat: ✨ add TypeScript support for better type safety的描述'
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
