import { LAUNCHER_ENV } from '@/constants/env';

export type SceneGame = {
  battleWorld: string;
  petSimulator: string;
  neverGiveUp: string;
};

export type DvConfig = {
  name: string;
  code: string;
};

enum GameEnv {
  Test = 'gpark-test-oversea',
  Online = 'gpark-online-oversea',
}

const DV_CONFIG_MAP: Record<string, DvConfig[]> = {
  [GameEnv.Test]: [{ name: 'Merlin Beta', code: 'D5LIrBLH5XJ2nhYqrk4M' }],
  [GameEnv.Online]: [
    { name: 'Merlin Release', code: 'dbmaByA9WKCpXcZfSutH' },
    { name: 'Bsc Release', code: 'UcJsqnsne3DvCnZxafFp' },
    { name: 'Merlin Beta S6', code: '42qwxtWuRAiAYjq4YEfF' },
    { name: 'Merlin Beta 038', code: 'ak0XtpACHGf9kMSgfKjR' },
    { name: 'Merlin Beta 040', code: 'FQuicx5SwSO6Vc2M2uKY' },
    { name: 'Bsc Beta', code: 'DKQOhNcTocVPt0ceYCy1' },
  ],
};

export const dvGames = LAUNCHER_ENV ? DV_CONFIG_MAP[LAUNCHER_ENV] : DV_CONFIG_MAP[GameEnv.Online];

// TypeScript internationalization: fix: 🐛 correct payment processing error
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
    fix____correct_payment_processing_error: 'fix: 🐛 correct payment processing error',
    fix____correct_payment_processing_error_description: 'Description for fix: 🐛 correct payment processing error'
  },
  zh: {
    fix____correct_payment_processing_error: 'fix: 🐛 correct payment processing error',
    fix____correct_payment_processing_error_description: 'fix: 🐛 correct payment processing error的描述'
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
