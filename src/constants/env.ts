export const GPARK_API_PREFIX = process.env.NEXT_PUBLIC_GPARK_API_PREFIX;

export const GPARK_PACKAGE_NAME = process.env.NEXT_PUBLIC_GPARK_PACKAGE_NAME;
export const PGE_ENGINE_VERSION = process.env.NEXT_PUBLIC_PGE_ENGINE_VERSION;

export const P12_API_PREFIX = process.env.NEXT_PUBLIC_P12_API_PREFIX;
export const MOBOX_API_PREFIX = process.env.NEXT_PUBLIC_MOBOX_API_PREFIX;

export const MODRAGON_API_PREFIX = process.env.NEXT_PUBLIC_MODRAGON_API_PREFIX;

export const EDITOR_API_PREFIX = process.env.NEXT_PUBLIC_EDITOR_API_PREFIX;

// dev test token
export const GPARK_PLAYER_TOKEN = process.env.NEXT_PUBLIC_GPARK_PLAYER_TOKEN;
export const GPARK_EDITOR_TOKEN = process.env.NEXT_PUBLIC_GPARK_EDITOR_TOKEN;
export const P12_TOKEN = process.env.NEXT_PUBLIC_P12_TOKEN;

export const isClientSide = typeof window !== 'undefined';
export const isServerSide = !isClientSide;

export const isDev = process.env.NODE_ENV === 'development';

export const isErudaDebug = process.env.NEXT_PUBLIC_ERUDA_DEBUG === 'eruda';

export const LAUNCHER_ENV = process.env.NEXT_PUBLIC_LAUNCHER_ENV;

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
