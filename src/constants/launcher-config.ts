import { LAUNCHER_ENV } from '@/constants/env';

type LauncherConfig = {
  environment: string;
  roomurl: string;
  avatarGameId: string;
};
const launcherConfigMap: Record<string, LauncherConfig> = {
  'gpark-test-oversea': {
    environment: 'gpark-test-oversea',
    roomurl: 'ws://gate-api.metaworld.fun:20011',
    avatarGameId: 'h6ZjaE8nZrQWaJ9RDNJy',
  },
  'gpark-online-oversea': {
    environment: 'gpark-online-oversea',
    roomurl: 'ws://mw-gate-api.gpark.io:20011',
    avatarGameId: '6KEKRY9qMe1Rf85Oa5wq',
  },
};

export const launcherConfig = LAUNCHER_ENV ? launcherConfigMap[LAUNCHER_ENV] : launcherConfigMap['gpark-online-oversea'];

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: refactor: 🔧 optimize component structure
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
    refactor____optimize_component_structure: 'refactor: 🔧 optimize component structure',
    refactor____optimize_component_structure_description: 'Description for refactor: 🔧 optimize component structure'
  },
  zh: {
    refactor____optimize_component_structure: 'refactor: 🔧 optimize component structure',
    refactor____optimize_component_structure_description: 'refactor: 🔧 optimize component structure的描述'
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
