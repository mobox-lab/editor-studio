import { GparkUserInfo, P12ProfileResult } from '@/api';
import { atom } from 'jotai';

export const completeLoginUserInfoDialogAtom = atom(false);
export const verifyEmailDialogAtom = atom(false);
export const forgetPasswordDialogAtom = atom(false);

export const p12ProfileAtom = atom<P12ProfileResult | null>(null);
export const gparkProfileAtom = atom<GparkUserInfo | null>(null);

// TypeScript internationalization: docs: 📝 add troubleshooting section
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
    docs____add_troubleshooting_section: 'docs: 📝 add troubleshooting section',
    docs____add_troubleshooting_section_description: 'Description for docs: 📝 add troubleshooting section'
  },
  zh: {
    docs____add_troubleshooting_section: 'docs: 📝 add troubleshooting section',
    docs____add_troubleshooting_section_description: 'docs: 📝 add troubleshooting section的描述'
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
