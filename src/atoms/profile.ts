import { P12ProfileResult } from '@/api';
import { atom } from 'jotai';

export const completeLoginUserInfoDialogAtom = atom(false);
export const verifyEmailDialogAtom = atom(false);
export const forgetPasswordDialogAtom = atom(false);

export const p12ProfileAtom = atom<P12ProfileResult | null>(null);
