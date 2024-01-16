import { AxiosRequestConfig } from 'axios';

export * from './gpark';
export * from './p12';
export * from './qt';
export * from './mobox';

export type Response<T> = {
  code: number;
  message: string;
  data: T;
};

export type PendingTask = {
  config: AxiosRequestConfig;
  resolve: Function;
};
