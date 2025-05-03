import { atom } from 'jotai';
import { GparkCardItem } from '@/api';

export const categoriesCardAtom = atom<GparkCardItem[]>([]);

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
