import { isServerSide } from '@/constants/env';

export const isQtClient = (function () {
  if (isServerSide) return false;
  return navigator.userAgent.includes('QtWebEngine');
})();

export function assert(condition: any, msg: string) {
  if (!condition) console.error(`[ASSERT]: ${msg || condition}`);
}

export function log(msg: string) {
  console.log(`%c${msg}`, 'font-weight: bold;');
}

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
