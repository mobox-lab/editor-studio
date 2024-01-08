import { sendEvent } from '@/utils';
import { toast } from 'react-toastify';
import { STORAGE_KEY } from '@/constants/storage';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { getMwRuntimeArgs } from '@/utils/mw-runtime-args';
import { fetchGparkMWGameDetail, fetchGparkTSGameConfig, qtClient } from '@/api';

type RunningGameParams = {
  gameId: string;
  roomId?: string;
  onlineCnt?: number;
};

export function useGparkTSGameConfig() {
  return useMutation({ mutationFn: (gameId: string) => fetchGparkTSGameConfig(gameId) });
}

export function useGparkMWGameDetail() {
  return useMutation({ mutationFn: (gameCode: string) => fetchGparkMWGameDetail(gameCode) });
}

export default function useRunningGame() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: tsGameConfigAsync } = useGparkTSGameConfig();
  const { mutateAsync: mwGameDetailAsync } = useGparkMWGameDetail();

  const handleRunningGame = useCallback(
    async (params: RunningGameParams) => {
      setIsLoading(true);
      const accessToken = localStorage.getItem(STORAGE_KEY.PLAYER_TOKEN);
      if (!accessToken) return setIsLoading(false);
      try {
        const { data: gameConfig } = await tsGameConfigAsync(params.gameId);
        const { data: gameDetail } = await mwGameDetailAsync(params.gameId);
        const enableMgs = gameDetail.gameTags.includes(1) ? 1 : 0;
        const data = getMwRuntimeArgs({
          enableMgs,
          part1: JSON.parse(gameDetail.expand),
          part2: gameConfig,
          token: accessToken,
          gameId: params.gameId,
          roomId: params.roomId,
        });
        const runningRes = await qtClient.runningGame(data);
        sendEvent('gp_game_play', '拉起游戏', {
          game_id: params.gameId,
          room_id: params.roomId,
          online_cnt: params.onlineCnt,
          result: runningRes?.statusCode,
        });
        if (runningRes?.statusCode === 500) {
          toast.error('Game engine is already running. Please close it and try again.');
        }
        if (runningRes?.statusCode === 501) {
          toast.error('Game launch failed: Json parsed failed.');
        }
        setIsLoading(false);
        return runningRes;
      } catch (e) {
        console.log('error: ', e);
        setIsLoading(false);
      }
    },
    [mwGameDetailAsync, tsGameConfigAsync],
  );

  return useMemo(() => ({ handleRunningGame, isLoading }), [handleRunningGame, isLoading]);
}
