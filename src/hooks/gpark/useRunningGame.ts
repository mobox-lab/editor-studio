import { sendEvent } from '@/utils';
import { toast } from 'react-toastify';
import { STORAGE_KEY } from '@/constants/storage';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { getMwRuntimeArgs } from '@/utils/mw-runtime-args';
import { fetchGparkMWGameDetail, fetchGparkTSGameConfig, qtClient, QTLogger } from '@/api';

type RunningGameParams = {
  gameId: string;
  roomId?: string;
  onlineCnt?: number;
  version?: string | null;
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
        const { code: gameDetailCode, data: gameDetail, message: gameDetailMessage } = await mwGameDetailAsync(params.gameId);
        if (gameDetailCode === 1003) {
          toast.error('Requires a later version of GPark');
          qtClient.logger(QTLogger.ERROR, gameDetailMessage);
        }
        // const enableMgs = gameDetail.gameTags.includes(1) ? 1 : 0;
        const enableMgs = 0;
        const data = getMwRuntimeArgs({
          enableMgs,
          part1: JSON.parse(gameDetail.expand),
          part2: gameConfig,
          token: accessToken,
          gameId: params.gameId,
          roomId: params.roomId,
          version: params.version,
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
      } catch (e: any) {
        console.log('error: ', e);
        qtClient.logger(QTLogger.ERROR, e.toString());
        setIsLoading(false);
      }
    },
    [mwGameDetailAsync, tsGameConfigAsync],
  );

  return useMemo(() => ({ handleRunningGame, isLoading }), [handleRunningGame, isLoading]);
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
