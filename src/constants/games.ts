import { LAUNCHER_ENV } from '@/constants/env';

export type SceneGame = {
  battleWorld: string;
  petSimulator: string;
  neverGiveUp: string;
};

export type DvConfig = {
  name: string;
  code: string;
};

enum GameEnv {
  Test = 'gpark-test-oversea',
  Online = 'gpark-online-oversea',
}

const DV_CONFIG_MAP: Record<string, DvConfig[]> = {
  [GameEnv.Test]: [{ name: 'Merlin Beta', code: 'D5LIrBLH5XJ2nhYqrk4M' }],
  [GameEnv.Online]: [
    { name: 'Merlin Release', code: 'mi3ELtZR2ucsG94d88Px' },
    { name: 'Bsc Release', code: 'UcJsqnsne3DvCnZxafFp' },
    { name: 'Merlin Beta S6', code: '42qwxtWuRAiAYjq4YEfF' },
    { name: 'Merlin Beta 038', code: 'ak0XtpACHGf9kMSgfKjR' },
    { name: 'Merlin Beta 040', code: 'FQuicx5SwSO6Vc2M2uKY' },
    { name: 'Bsc Beta', code: 'DKQOhNcTocVPt0ceYCy1' },
  ],
};

export const dvGames = LAUNCHER_ENV ? DV_CONFIG_MAP[LAUNCHER_ENV] : DV_CONFIG_MAP[GameEnv.Online];
