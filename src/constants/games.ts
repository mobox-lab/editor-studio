import { LAUNCHER_ENV } from '@/constants/env';

export type SceneGame = {
  battleWorld: string;
  petSimulator: string;
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
    { name: 'Merlin Release', code: 'jKXfft1vigeMIXLLkc3N' },
    { name: 'Bsc Release', code: 'UcJsqnsne3DvCnZxafFp' },
    { name: 'Merlin Beta', code: 'G6Kq8HDip3gXWKlRraqg' },
    { name: 'Merlin Beta S2', code: 'qHObJs2hyWYhSZUDj6L2' },
    { name: 'Merlin Beta S3', code: 'q1vtx0y9hFUgh7jlb86C' },
    { name: 'Merlin Beta TD', code: 'viZFX0AlKUbrpl7tpP21' },
    { name: 'Merlin Beta 038', code: 'ak0XtpACHGf9kMSgfKjR' },
    { name: 'Bsc Beta', code: 'DKQOhNcTocVPt0ceYCy1' },
  ],
};

export const dvGames = LAUNCHER_ENV ? DV_CONFIG_MAP[LAUNCHER_ENV] : DV_CONFIG_MAP[GameEnv.Online];
