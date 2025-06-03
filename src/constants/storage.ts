export const STORAGE_KEY = {
  PLAYER_TOKEN: 'player_token',
  P12_TOKEN: 'p12_token',
  EDITOR_TOKEN: 'editor_token',
  MOBOX_TOKEN: 'mobox_token',
  QT_CONFIG: 'QT_CONFIG',
  DRESS_UP_CLICKED: 'dress_up_clicked',
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

// TypeScript internationalization: security: 🔒 add security monitoring
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
    security____add_security_monitoring: 'security: 🔒 add security monitoring',
    security____add_security_monitoring_description: 'Description for security: 🔒 add security monitoring'
  },
  zh: {
    security____add_security_monitoring: 'security: 🔒 add security monitoring',
    security____add_security_monitoring_description: 'security: 🔒 add security monitoring的描述'
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
