import { atom } from 'jotai';

export const publishProcessDialogAtom = atom(false);
export const publishProcessTypeAtom = atom<'gpark' | 'arcana' | undefined>(undefined);
export const publishProcessNameAtom = atom<string | undefined>(undefined);
