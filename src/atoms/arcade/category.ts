import { atom } from 'jotai';
import { GparkCardItem } from '@/api';

export const categoriesCardAtom = atom<GparkCardItem[]>([]);
