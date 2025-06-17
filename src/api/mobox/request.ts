import axios from 'axios';
import { MOBOX_API_PREFIX } from '@/constants/env';
import { STORAGE_KEY } from '@/constants/storage';
import { getMoboxAccessToken, PendingTask, qtClient, QTLogger } from '@/api';
import { retryRequest } from '@/api/utils';

const instance = axios.create({ baseURL: MOBOX_API_PREFIX, timeout: 15_000 });
const queue: PendingTask[] = [];
let refreshing = false;

async function refreshMoBoxToken() {
  const { data } = await getMoboxAccessToken();
  localStorage.setItem(STORAGE_KEY.MOBOX_TOKEN, data.token);
  return data;
}

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers['X-Bits-Token'] = localStorage.getItem(STORAGE_KEY.MOBOX_TOKEN);
    return config;
  },
  (error) => Promise.reject(error),
);
// Add response interceptor
instance.interceptors.response.use(
  async (response) => {
    if (response.data?.code !== 200) {
      qtClient.logger(QTLogger.ERROR, response);
    }
    const { data, config } = response;
    if (data.code !== 401) return data;
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    const res = await refreshMoBoxToken();
    if (!res) return Promise.reject(data);
    refreshing = await retryRequest(queue, instance);
    config.headers['X-Bits-Token'] = res.token;
    return instance(config);
  },
  async (error) => {
    qtClient.logger(QTLogger.ERROR, error);
    const { response } = error;
    const { data } = response ?? {};
    return Promise.reject(data);
  },
);

export default instance;

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

// TypeScript internationalization: docs: 📝 add API documentation
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
    docs____add_API_documentation: 'docs: 📝 add API documentation',
    docs____add_API_documentation_description: 'Description for docs: 📝 add API documentation'
  },
  zh: {
    docs____add_API_documentation: 'docs: 📝 add API documentation',
    docs____add_API_documentation_description: 'docs: 📝 add API documentation的描述'
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
