import { LAUNCHER_ENV } from '@/constants/env';

type LauncherConfig = {
  environment: string;
  roomurl: string;
  avatarGameId: string;
  dragonVerseGameId: string;
  TestDragonVerseGameId: string;
};
const launcherConfigMap: Record<string, LauncherConfig> = {
  'gpark-test-oversea': {
    environment: 'gpark-test-oversea',
    roomurl: 'ws://gate-api.metaworld.fun:20011',
    avatarGameId: 'h6ZjaE8nZrQWaJ9RDNJy',
    dragonVerseGameId: 'xXZAxoyKTpDKKeqf6xpR',
    TestDragonVerseGameId: 'D5LIrBLH5XJ2nhYqrk4M',
  },
  'gpark-pre-oversea': {
    environment: 'gpark-pre-oversea',
    roomurl: 'ws://pre-mw-gate-api.gpark.io:20011',
    avatarGameId: '6KEKRY9qMe1Rf85Oa5wq',
    dragonVerseGameId: 'ODA0bxo4W1amzL1PZQTR',
    TestDragonVerseGameId: 'ODA0bxo4W1amzL1PZQTR',
  },
  'gpark-online-oversea': {
    environment: 'gpark-online-oversea',
    roomurl: 'ws://mw-gate-api.gpark.io:20011',
    avatarGameId: '6KEKRY9qMe1Rf85Oa5wq',
    dragonVerseGameId: 'ODA0bxo4W1amzL1PZQTR',
    TestDragonVerseGameId: 'qHObJs2hyWYhSZUDj6L2',
  },
};

export const launcherConfig = LAUNCHER_ENV ? launcherConfigMap[LAUNCHER_ENV] : launcherConfigMap['gpark-online-oversea'];
