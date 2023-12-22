import { qtClient } from '@/api/qt';
import { AxiosInstance } from 'axios';
import { PendingTask, TokenType } from '@/api/types';

export async function refreshToken(type: TokenType) {
  const key = `${type}_token`;
  const token = localStorage.getItem(key);
  if (!token) return false;
  const res = await qtClient.refreshToken<{ token: string }>({ type, token: token });
  if (!res) return false;
  localStorage.setItem(key, res.token);
  return res;
}

export async function retryRequest(queue: PendingTask[], instance: AxiosInstance) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      queue.forEach(({ config, resolve }) => setTimeout(() => resolve(instance(config)), Math.random() * 500));
      resolve(false);
    }, 500);
  });
}
