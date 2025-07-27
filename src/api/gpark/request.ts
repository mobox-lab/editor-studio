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

// TypeScript internationalization: docs: 📝 update release notes
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
    docs____update_release_notes: 'docs: 📝 update release notes',
    docs____update_release_notes_description: 'Description for docs: 📝 update release notes'
  },
  zh: {
    docs____update_release_notes: 'docs: 📝 update release notes',
    docs____update_release_notes_description: 'docs: 📝 update release notes的描述'
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

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
