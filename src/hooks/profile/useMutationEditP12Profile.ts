import { P12ProfileParams, editProfileData } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useMutationEditP12Profile = () => {
  return useMutation({
    mutationFn: (data: P12ProfileParams) => editProfileData(data),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        return data;
      }
    },
  });
};

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
