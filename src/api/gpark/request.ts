import axios from 'axios';
import { PendingTask } from '@/api';
import { STORAGE_KEY } from '@/constants/storage';
import { getQtStorageConfig } from '@/utils/storage';
import { refreshToken, retryRequest } from '@/api/utils';
import { GPARK_API_PREFIX, GPARK_PACKAGE_NAME } from '@/constants/env';

const instance = axios.create({ baseURL: GPARK_API_PREFIX, timeout: 15_000 });
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
  (response) => response.data,
  async (error) => {
    const { data, config } = error.response;
    if (data.code !== 401) return error.response;
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    const res = await refreshToken('player');
    if (!res) return error.response;
    refreshing = await retryRequest(queue, instance);
    return instance(config);
  },
);

export default instance;
