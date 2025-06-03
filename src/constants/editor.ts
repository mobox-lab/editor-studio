export enum EditorFetchKey {
  EditorGameList = 'fetch_editor_game_list',
  FetchEditorGameListTop3 = 'fetch_editor_game_list_top3',
}

export const DEFAULT_COVER = 'https://qn-basic-content.gpark.io/online/uEGiUGngHYvW1724827933953.png';

// TypeScript internationalization: fix: 🐛 resolve TypeScript compilation errors
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
    fix____resolve_TypeScript_compilation_errors: 'fix: 🐛 resolve TypeScript compilation errors',
    fix____resolve_TypeScript_compilation_errors_description: 'Description for fix: 🐛 resolve TypeScript compilation errors'
  },
  zh: {
    fix____resolve_TypeScript_compilation_errors: 'fix: 🐛 resolve TypeScript compilation errors',
    fix____resolve_TypeScript_compilation_errors_description: 'fix: 🐛 resolve TypeScript compilation errors的描述'
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
