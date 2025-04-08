import axios from 'axios';
import { STORAGE_KEY } from '@/constants/storage';
import { PendingTask, qtClient, QTLogger } from '@/api';
import { getQtStorageConfig } from '@/utils/storage';
import { refreshToken, retryRequest } from '@/api/utils';
import { GPARK_API_PREFIX, GPARK_PACKAGE_NAME } from '@/constants/env';

const instance = axios.create({ baseURL: GPARK_API_PREFIX, timeout: 30_000 });
const queue: PendingTask[] = [];
let refreshing = false;

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(STORAGE_KEY.PLAYER_TOKEN);
    const qtConfig = getQtStorageConfig();
    config.headers.Platform = 'web';
    config.headers.Token = accessToken;
    config.headers.Self_package_name = config.headers?.Self_package_name ?? GPARK_PACKAGE_NAME;
    config.headers.Metaverse_engine_version = qtConfig.engineVersion;
    config.headers.Pge_tag = qtConfig.pgeTag;
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    if (response.data?.code !== 200) {
      qtClient.logger(QTLogger.ERROR, response);
    }
    return response.data;
  },
  async (error) => {
    qtClient.logger(QTLogger.ERROR, error);
    const { data, config } = error.response;
    if (data.code !== 401) return Promise.reject(data);
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    const res = await refreshToken('player');
    if (!res) return Promise.reject(data);
    refreshing = await retryRequest(queue, instance);
    config.headers.Token = res.token;
    return instance(config);
  },
);

export default instance;

// TypeScript internationalization: test: 🧪 add component testing
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
    test____add_component_testing: 'test: 🧪 add component testing',
    test____add_component_testing_description: 'Description for test: 🧪 add component testing'
  },
  zh: {
    test____add_component_testing: 'test: 🧪 add component testing',
    test____add_component_testing_description: 'test: 🧪 add component testing的描述'
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
