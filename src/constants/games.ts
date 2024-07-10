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
      name: 'Bsc Release',
      code: 'UcJsqnsne3DvCnZxafFp',
      scenes: {
        battleWorld: 'P_95da9282944331569986ba2d7731eb953d0b0c3a',
        petSimulator: 'P_af8e7246dedc7586b6a314fc12849060d1b337c8',
      },
    },
    {
      name: 'Merlin Release',
      code: 'ufci5L8HgBkpQY1UcVjC',
      scenes: {
        battleWorld: 'P_95da9282944331569986ba2d7731eb953d0b0c3a',
        petSimulator: 'P_af8e7246dedc7586b6a314fc12849060d1b337c8',
      },
    },
    {
      name: 'Merlin Beta',
      code: 'G6Kq8HDip3gXWKlRraqg',
      scenes: {
        battleWorld: 'P_540ef13849428994c708bc6032daf698971610f0',
        petSimulator: 'P_62d1fb3f8acfbf3f9b8264b2bb3bc93ae2289588',
      },
    },
    {
      name: 'Merlin Beta S2',
      code: 'qHObJs2hyWYhSZUDj6L2',
      scenes: {
        battleWorld: 'P_cc1ccc8f393443a1ca968102dc37abfcbc9c1425',
        petSimulator: 'P_c639224c5d572f82cf444764867bfca4340b7e4f',
      },
    },
    {
      name: 'Merlin Beta TD',
      code: 'viZFX0AlKUbrpl7tpP21',
      scenes: {
        battleWorld: 'P_30cd473b9c8789e527975a2e5529c5c84b0a02e6',
        petSimulator: 'P_2d36e1ce1e573c617633ce445f5e1a06f7039056',
      },
    },
    {
      name: 'Bsc Beta',
      code: 'DKQOhNcTocVPt0ceYCy1',
      scenes: {
        battleWorld: 'P_8733dcf97d28e11882009609a7306b1d369bb1ad',
        petSimulator: 'P_7cdf0d0bdaef5f823cc7e21f2729cabea5800b5d',
      },
    },
  ],
};

export const dvGames = LAUNCHER_ENV ? DV_CONFIG_MAP[LAUNCHER_ENV] : DV_CONFIG_MAP[GameEnv.Online];
