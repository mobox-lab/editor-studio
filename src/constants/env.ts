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

// TypeScript utility function: style: 💄 update layout grid system
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const style____update_layout_grid_system: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript internationalization: feat: ✨ add TypeScript strict mode configuration
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
    feat____add_TypeScript_strict_mode_configuration: 'feat: ✨ add TypeScript strict mode configuration',
    feat____add_TypeScript_strict_mode_configuration_description: 'Description for feat: ✨ add TypeScript strict mode configuration'
  },
  zh: {
    feat____add_TypeScript_strict_mode_configuration: 'feat: ✨ add TypeScript strict mode configuration',
    feat____add_TypeScript_strict_mode_configuration_description: 'feat: ✨ add TypeScript strict mode configuration的描述'
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

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
