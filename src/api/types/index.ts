export * from './gpark';
export * from './p12';

export type Response<T> = {
  code: number;
  message: string;
  data: T;
};
