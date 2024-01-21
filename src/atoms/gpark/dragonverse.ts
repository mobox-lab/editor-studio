import { DragonNeoMenuItem } from '@/constants/enum';
import { atom } from 'jotai';

export const dragonverseBetaDialogOpen = atom<boolean>(false);

export const dragonNeoActiveMenuAtom = atom<DragonNeoMenuItem>(DragonNeoMenuItem.Governance);
