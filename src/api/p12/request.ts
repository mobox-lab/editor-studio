import axios from 'axios';
import { PendingTask } from '@/api';
import { P12_API_PREFIX } from '@/constants/env';
import { STORAGE_KEY } from '@/constants/storage';
import { refreshToken, retryRequest } from '@/api/utils';

const instance = axios.create({ baseURL: P12_API_PREFIX, timeout: 15_000 });
const queue: PendingTask[] = [];
let refreshing = false;

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(STORAGE_KEY.P12_TOKEN);
    config.headers.Authorization = accessToken ? 'Bearer ' + accessToken : '';
    return config;
  },
  (error) => Promise.reject(error),
);
// Add response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { data, config } = error.response;
    if (data.code !== 401 || data.data[0] === 'TokenNotExist' || data.data[0] === 'JsonWebTokenError')
      return Promise.reject(data);
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    if (data.data[0] === 'TokenExpiredError') {
      const res = await refreshToken('p12');
      if (!res) return Promise.reject(data);
      config.headers.Authorization = 'Bearer ' + res.token;
    }
    if (data.data[0] === 'EditorExpiredError') {
      const res = await refreshToken('editor');
      if (!res) return Promise.reject(data);
      config.headers.Token = res.token;
    }
    refreshing = await retryRequest(queue, instance);
    return instance(config);
  },
);

export default instance;
