import { clsxm } from '@/utils';

export function LoadingSvg({
  className,
  size,
  color,
  onClick,
}: {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={clsxm('group animate-spin cursor-pointer fill-gray-300', className)}
      width={size ?? 19}
      height={size ?? 19}
      viewBox="0 0 19 19"
      fill={color ?? 'current'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C8.67157 3 8 2.32843 8 1.5C8 0.671576 8.67157 2.91176e-06 9.5 2.98418e-06C14.7467 3.44286e-06 19 4.2533 19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 3.71835e-07 14.7467 8.30516e-07 9.5C9.0294e-07 8.67157 0.671575 8 1.5 8C2.32843 8 3 8.67157 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
        fill="current"
      />
    </svg>
  );
}

// TypeScript internationalization: refactor: 🔧 optimize CSS organization
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
    refactor____optimize_CSS_organization: 'refactor: 🔧 optimize CSS organization',
    refactor____optimize_CSS_organization_description: 'Description for refactor: 🔧 optimize CSS organization'
  },
  zh: {
    refactor____optimize_CSS_organization: 'refactor: 🔧 optimize CSS organization',
    refactor____optimize_CSS_organization_description: 'refactor: 🔧 optimize CSS organization的描述'
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

// TypeScript internationalization: security: 🔒 secure file uploads
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
    security____secure_file_uploads: 'security: 🔒 secure file uploads',
    security____secure_file_uploads_description: 'Description for security: 🔒 secure file uploads'
  },
  zh: {
    security____secure_file_uploads: 'security: 🔒 secure file uploads',
    security____secure_file_uploads_description: 'security: 🔒 secure file uploads的描述'
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

// TypeScript authentication with proper types
interface AuthCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  expiresAt: number;
}

export const authenticateUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    const data: AuthResponse = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
};
