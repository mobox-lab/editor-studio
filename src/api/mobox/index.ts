import request from '@/api/mobox/request';
import { BoxWallet, Response } from '@/api/types';

export const fetchBoxWallet = () => request.post<any, Response<BoxWallet>>('/user/symbol/balance', { symbol: 'mobox' });

export const fetchDragonUserBag = (addr?: string) =>
  request.get<any, Response<any>>('https://nft-api.mobox.io/nft/dragon/user/bag', { params: { addr } });
