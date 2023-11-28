import { isServerSide } from '@/constants/env';

export const isQtClient = (function () {
  if (isServerSide) return false;
  return navigator.userAgent.includes('QtWebEngine');
})();

export function assert(condition: any, msg: string) {
  if (!condition) throw new Error(`[ASSERT]: ${msg || condition}`);
}

export function log(msg: string) {
  console.log(`%c${msg}`, 'font-weight: bold;');
}
