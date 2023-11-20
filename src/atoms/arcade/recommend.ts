import { atom } from 'jotai';
import { GparkGameItem } from '@/api';

export const recommendGameListAtom = atom<GparkGameItem[]>([]);
