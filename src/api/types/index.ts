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

export type PublishGame = {
  id: number;
  status: 1 | 0;
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
