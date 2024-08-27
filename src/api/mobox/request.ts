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
