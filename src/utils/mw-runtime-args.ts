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
    enableMgs,
  };
}
