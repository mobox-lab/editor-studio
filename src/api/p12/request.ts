import axios from 'axios';
import { P12_API_PREFIX } from '@/constants/env';

const instance = axios.create({ baseURL: P12_API_PREFIX, timeout: 15_000 });

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2Nzk2NThCZTAzNDc1RDBBNTM5M2M3MGVhMEU5QTExNThEZmFlMUZmIiwibm9uY2UiOiJ3VGx5M0V5T0g4TXFQOVR2UyIsInBsYXRmb3JtIjowLCJpYXQiOjE3MDA4MDU0NjAsImV4cCI6MTcwMTQxMDI2MH0.i59br9CU1fYjcP8vACytKBjFFEGKK1tn0jqf11ugzi4'; // temp token
    config.headers.Authorization = token ? 'Bearer ' + token : '';
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
