import { NewsItem } from '@/api';
import { atom } from 'jotai';

export const p12NewInfoAtom = atom<NewsItem | null>(null);
export const p12NewDialogOpenAtom = atom<boolean>(false);
