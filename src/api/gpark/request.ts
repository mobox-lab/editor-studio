import axios from 'axios';
import { GPARK_API_PREFIX, GPARK_PACKAGE_NAME, GPARK_USER_TOKEN } from '@/constants/env';

const instance = axios.create({ baseURL: GPARK_API_PREFIX, timeout: 15_000 });

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers.Platform = 'web';
    config.headers.Token = GPARK_USER_TOKEN;
    config.headers.Self_package_name = GPARK_PACKAGE_NAME;
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    const { data } = response ?? {};
    return Promise.reject(data);
  },
);

export default instance;
