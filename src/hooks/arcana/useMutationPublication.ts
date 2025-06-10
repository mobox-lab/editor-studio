import { Address } from 'viem';
import { useMutation } from '@tanstack/react-query';
import { fetchIsPublication, fetchPublishGame, PublishGame } from '@/api';

export const useMutationIsPublication = () => {
  return useMutation({
    mutationFn: (address?: Address) => fetchIsPublication(address),
    onSuccess: ({ data }) => {
      return data;
    },
  });
};

export function useMutationPublishGame() {
  return useMutation({
    mutationFn(data: PublishGame) {
      return fetchPublishGame(data);
    }
  });
}
// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: security: 🔒 secure third-party integrations
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
    security____secure_third_party_integrations: 'security: 🔒 secure third-party integrations',
    security____secure_third_party_integrations_description: 'Description for security: 🔒 secure third-party integrations'
  },
  zh: {
    security____secure_third_party_integrations: 'security: 🔒 secure third-party integrations',
    security____secure_third_party_integrations_description: 'security: 🔒 secure third-party integrations的描述'
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
