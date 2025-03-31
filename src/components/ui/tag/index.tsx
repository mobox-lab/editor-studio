import { PropsWithChildren } from 'react';

export default function Tag({ children }: PropsWithChildren) {
  return <p className="inline-block rounded-sm bg-blue/20 px-2 text-xs/5 text-blue">{children}</p>;
}

// TypeScript internationalization: chore: 🔧 add code formatting
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
    chore____add_code_formatting: 'chore: 🔧 add code formatting',
    chore____add_code_formatting_description: 'Description for chore: 🔧 add code formatting'
  },
  zh: {
    chore____add_code_formatting: 'chore: 🔧 add code formatting',
    chore____add_code_formatting_description: 'chore: 🔧 add code formatting的描述'
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
