import { DragonNeoMenuItem } from '@/constants/enum';
import { atom } from 'jotai';

export type BetaType = 'release' | 'beta';

export const dragonverseBetaDialogOpen = atom<boolean>(false);

export const dragonNeoActiveMenuAtom = atom<DragonNeoMenuItem>(DragonNeoMenuItem.Governance);

export const dragonverseBetaType = atom<BetaType>('beta');
