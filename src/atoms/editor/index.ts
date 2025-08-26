import { DataListType, GameListType } from '@/api/types/p12';
import { InfiniteData } from '@tanstack/react-query';
import { atom } from 'jotai';

export const editorGamesTop3ListAtom = atom<DataListType[]>([]);
export const editorGamesListAtom = atom<InfiniteData<GameListType, unknown> | undefined>(undefined);

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
