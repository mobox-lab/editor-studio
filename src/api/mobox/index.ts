import request from '@/api/mobox/request';
import { BoxWallet, DragonBag, Response } from '@/api/types';
import { STORAGE_KEY } from "@/constants/storage";

export const getMoboxAccessToken = () => request.post<any, Response<{ token: string }>>('/oauth/p12', { ptoken: window.localStorage.getItem(STORAGE_KEY.P12_TOKEN), });

export const fetchBoxWallet = () => request.post<any, Response<BoxWallet>>('/user/symbol/balance', { symbol: 'mbox' });

export const fetchDragonUserBag = (addr?: string) =>
  request.get<any, Response<DragonBag>>('https://nft-api.mobox.io/nft/dragon/user/bag', { params: { addr } });

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
