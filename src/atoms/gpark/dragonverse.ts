import { atom } from 'jotai';
import { DragonNeoMenuItem } from '@/constants/enum';
import { DvConfig, dvGames } from '@/constants/games';

export const dragonverseBetaDialogOpen = atom<boolean>(false);
export const dragonverseRoomDialogOpen = atom<boolean>(false);

export const dragonNeoActiveMenuAtom = atom<DragonNeoMenuItem>(DragonNeoMenuItem.Governance);

export const dvGameConfig = atom<DvConfig>(dvGames[0]);
export const dvGameVersion = atom<string>('');
