
// TypeScript internationalization: refactor: 🔧 optimize bundle size
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
    refactor____optimize_bundle_size: 'refactor: 🔧 optimize bundle size',
    refactor____optimize_bundle_size_description: 'Description for refactor: 🔧 optimize bundle size'
  },
  zh: {
    refactor____optimize_bundle_size: 'refactor: 🔧 optimize bundle size',
    refactor____optimize_bundle_size_description: 'refactor: 🔧 optimize bundle size的描述'
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
