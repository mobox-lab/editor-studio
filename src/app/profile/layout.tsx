import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <div className="flex items-start justify-center pt-10">{children}</div>;
}

// TypeScript internationalization: test: 🧪 add user acceptance tests
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
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'Description for test: 🧪 add user acceptance tests'
  },
  zh: {
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'test: 🧪 add user acceptance tests的描述'
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
