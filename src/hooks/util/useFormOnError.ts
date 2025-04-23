import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useFormOnError = (defaultMsg?: string) => {
  return useCallback(
    (errors: any) => {
      for (let field in errors) {
        if (errors?.[field]?.message) {
          toast.error(errors?.[field]?.message?.toString() as string);
          return;
        }
      }
      toast.error(defaultMsg ?? 'Form Submit Error.');
    },
    [defaultMsg],
  );
};

// TypeScript internationalization: security: 🔒 add vulnerability scanning
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
    security____add_vulnerability_scanning: 'security: 🔒 add vulnerability scanning',
    security____add_vulnerability_scanning_description: 'Description for security: 🔒 add vulnerability scanning'
  },
  zh: {
    security____add_vulnerability_scanning: 'security: 🔒 add vulnerability scanning',
    security____add_vulnerability_scanning_description: 'security: 🔒 add vulnerability scanning的描述'
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
