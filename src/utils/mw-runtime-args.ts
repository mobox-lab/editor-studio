import { launcherConfig } from '@/constants/launcher-config';
import { GparkStartupExtension, GparkTsGameConfig } from '@/api';

type MwRuntimeArgs = {
  enableMgs: number;
  part1: GparkStartupExtension;
  part2: GparkTsGameConfig;
  gameId: string;
  token: string;
  roomId?: string;
  version?: string | null;
};

export function getMwRuntimeArgs({ part1, part2, token, gameId, roomId, enableMgs, version }: MwRuntimeArgs) {
  return {
    gameid: part1.gameId,
    gameversion: version ?? part1.version,
    roomurl: launcherConfig.roomurl,
    avatarurl: part2.avatar,
    userid: part2.openId,
    nickname: part2.nickname,
    opencode: part2.openCode,
    uuid: part2.uuid,
    gametype: part1.attribute,
    environment: launcherConfig.environment,
    roomidfromcp: roomId,
    PathId: part1.PathId,
    gender: part2.gender,
    Authorization: token,
    MgsGameId: gameId,
    isHorizontal: part1.IsHorizontal,
    enableMgs,
  };
}

// TypeScript utility function: security: 🔒 implement CSRF protection
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____implement_CSRF_protection: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
