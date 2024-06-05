import { LAUNCHER_ENV } from '@/constants/env';

export type DvConfig = {
  name: string;
  code: string;
  scenes: {
    battleWorld: string;
    petSimulator: string;
  };
};

enum GameEnv {
  Test = 'gpark-test-oversea',
  Online = 'gpark-online-oversea',
}

const DV_CONFIG_MAP: Record<string, DvConfig[]> = {
  [GameEnv.Test]: [
    {
      name: 'Merlin Beta',
      code: 'D5LIrBLH5XJ2nhYqrk4M',
      scenes: {
        battleWorld: 'P_c23daf9d9f3ffda0902b548d52544a5550f6ab66',
        petSimulator: 'P_66242755654328adebe4d8586ab911178bf76f0f',
      },
    },
  ],
  [GameEnv.Online]: [
    {
      name: 'Merlin Release',
      code: 'ufci5L8HgBkpQY1UcVjC',
      scenes: {
        battleWorld: 'P_5f2df3f6e4b89742ab115cfbf7b266b3207c8d49',
        petSimulator: 'P_1bf267702412bf90896394deaa1b982ca12285f6',
      },
    },
    {
      name: 'Merlin Beta',
      code: 'qHObJs2hyWYhSZUDj6L2',
      scenes: {
        battleWorld: 'P_9e59b91d2e56ffc632e64f5c00ae28fb935c324c',
        petSimulator: 'P_a09e11f33ea371c5ca3f08cbcfaeeb56e8bb0537',
      },
    },
    {
      name: 'Merlin Beta TD',
      code: 'viZFX0AlKUbrpl7tpP21',
      scenes: {
        battleWorld: 'P_799f212ed52fdf7d7f5e3e52800d0c3deeeb4b82',
        petSimulator: 'P_8db999a0732666f39ecee330feec6041b19e98ae',
      },
    },
    {
      name: 'Bsc Beta',
      code: 'DKQOhNcTocVPt0ceYCy1',
      scenes: {
        battleWorld: 'P_c0bfa7c18d7cc225a6ee94707e45ee0093de58f4',
        petSimulator: 'P_849c6817e918b6f382533678e6f4f3b836615d17',
      },
    },
  ],
};

export const dvGames = LAUNCHER_ENV ? DV_CONFIG_MAP[LAUNCHER_ENV] : DV_CONFIG_MAP[GameEnv.Online];
