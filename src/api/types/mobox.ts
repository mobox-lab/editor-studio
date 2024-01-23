import { DragonStone } from '@/constants/mobox/dragon-stone';

export type BoxWallet = {
  balance: number;
};

export type DragonBag = {
  stones: Record<DragonStone, number>;
  gems: Record<string, number>;
};
