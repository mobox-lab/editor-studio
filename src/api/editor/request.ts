import axios from 'axios';
import { PendingTask, qtClient, QTLogger } from '@/api';
import { refreshToken, retryRequest } from '@/api/utils';
import { EDITOR_API_PREFIX } from '@/constants/env';
import { STORAGE_KEY } from '@/constants/storage';

const instance = axios.create({ baseURL: EDITOR_API_PREFIX, timeout: 15_000 });
const queue: PendingTask[] = [];
let refreshing = false;

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers.Token = localStorage.getItem(STORAGE_KEY.EDITOR_TOKEN);
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
    const res = await refreshToken('editor');
    if (!res) return Promise.reject(data);
    refreshing = await retryRequest(queue, instance);
    return instance(config);
  },
);

export default instance;
