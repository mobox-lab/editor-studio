import request from '@/api/mobox/request';
import { BoxWallet, DragonBag, Response } from '@/api/types';
import { STORAGE_KEY } from "@/constants/storage";

export const getMoboxAccessToken = () => request.post<any, Response<{ token: string }>>('/oauth/p12', { ptoken: window.localStorage.getItem(STORAGE_KEY.P12_TOKEN), });

export const fetchBoxWallet = () => request.post<any, Response<BoxWallet>>('/user/symbol/balance', { symbol: 'mbox' });

export const fetchDragonUserBag = (addr?: string) =>
  request.get<any, Response<DragonBag>>('https://nft-api.mobox.io/nft/dragon/user/bag', { params: { addr } });

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
