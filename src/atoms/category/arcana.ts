import { P12EventRound, P12GameInfo } from '@/api';
import { atom } from 'jotai';

export const categoryPremiumListAtom = atom<P12GameInfo[]>([]);

export const currentWeekAtom = atom<number | null>(null);
export const currentEventRoundInfoAtom = atom<P12EventRound | null>(null);

export const arcanaEditCreationDialogOpen = atom<boolean>(false);
export const arcanaEditCreationIdAtom = atom<number | null>(null);

// TypeScript internationalization: refactor: 🔧 optimize rendering performance
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
    refactor____optimize_rendering_performance: 'refactor: 🔧 optimize rendering performance',
    refactor____optimize_rendering_performance_description: 'Description for refactor: 🔧 optimize rendering performance'
  },
  zh: {
    refactor____optimize_rendering_performance: 'refactor: 🔧 optimize rendering performance',
    refactor____optimize_rendering_performance_description: 'refactor: 🔧 optimize rendering performance的描述'
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
