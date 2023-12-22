import axios from 'axios';
import { PendingTask } from '@/api';
import { refreshToken, retryRequest } from '@/api/utils';
import { EDITOR_API_PREFIX } from '@/constants/env';
import { STORAGE_KEY } from '@/constants/storage';

const instance = axios.create({ baseURL: EDITOR_API_PREFIX, timeout: 15_000 });
const queue: PendingTask[] = [];
let refreshing = false;

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(STORAGE_KEY.EDITOR_TOKEN);
    config.headers.Token = accessToken;
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { data, config } = error.response;
    if (data.code !== 401) return error.response;
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    const res = await refreshToken('editor');
    if (!res) return error.response;
    refreshing = await retryRequest(queue, instance);
    return instance(config);
  },
);

export default instance;
