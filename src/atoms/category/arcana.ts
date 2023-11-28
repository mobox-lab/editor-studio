import { P12EventRound, P12GameInfo } from '@/api';
import { atom } from 'jotai';

export const categoryPremiumListAtom = atom<P12GameInfo[]>([]);

export const currentWeekAtom = atom<number | null>(null);
export const currentEventRoundInfoAtom = atom<P12EventRound | null>(null);

export const arcanaEditCreationDialogOpen = atom<boolean>(false);
