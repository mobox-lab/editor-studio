import axios from 'axios';
import { GPARK_API_PREFIX, GPARK_PACKAGE_NAME } from '@/constants/env';

const instance = axios.create({ baseURL: GPARK_API_PREFIX, timeout: 15_000 });

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers.Platform = 'web';
    config.headers.Self_package_name = GPARK_PACKAGE_NAME;
    config.headers.Token =
      'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMTJjZTBiMS01NTY5LTQwY2EtYTFkYy0xNTczNTU2NTlmN2MiLCJpYXQiOjE3MDA1MzM5MDYsInN1YiI6IntcInVpZFwiOlwiYmNlZTNkYjNmN2QxNGQ4NGJmYjY1M2UyOTgyYzc0MDlcIixcImN1cnJlbnRCZWxvbmdcIjpcIk5BXCIsXCJlbnZcIjpcIm9ubGluZVwiLFwicGFja1wiOlwiZ3BhcmtcIn0iLCJleHAiOjE3MDE4Mjk5MDZ9.CWedThMCpURcLMISxW-Ue180N291vnQTNKLbFyWV3Fc';
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
