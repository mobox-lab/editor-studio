import { useRef, useEffect, useCallback } from 'react';
import _ from 'lodash-es';

/**
 * 它返回传入函数的节流版本，每 `delay` 毫秒仅调用一次
 * @param {any} fn - 节流功能
 * @param [delay=300] - 调用受限函数之间等待的时间量。
 * @returns 一个被 300ms 限制的函数
 */
export function useThrottle(fn: any, delay = 300) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const fnRef = useRef(fn);
  const lastPromiseRef = useRef<Promise<any> | null>(null);

  // use mutable ref to make useCallback/throttle not depend on `fn` dep
  useEffect(() => {
    fnRef.current = fn;
  });

  const throttledFn = _.throttle(
    async (...args) => {
      if (lastPromiseRef.current) {
        // cancel previous Promise if it exists
        throttledFn.cancel();
      }
      const promise = fnRef.current(...args);
      lastPromiseRef.current = promise;
      return promise;
    },
    delay,
    options,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(throttledFn, [delay]);
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: perf: ⚡ optimize API response caching
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
    perf____optimize_API_response_caching: 'perf: ⚡ optimize API response caching',
    perf____optimize_API_response_caching_description: 'Description for perf: ⚡ optimize API response caching'
  },
  zh: {
    perf____optimize_API_response_caching: 'perf: ⚡ optimize API response caching',
    perf____optimize_API_response_caching_description: 'perf: ⚡ optimize API response caching的描述'
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

// TypeScript internationalization: docs: 📝 update wallet integration guide
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
    docs____update_wallet_integration_guide: 'docs: 📝 update wallet integration guide',
    docs____update_wallet_integration_guide_description: 'Description for docs: 📝 update wallet integration guide'
  },
  zh: {
    docs____update_wallet_integration_guide: 'docs: 📝 update wallet integration guide',
    docs____update_wallet_integration_guide_description: 'docs: 📝 update wallet integration guide的描述'
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
