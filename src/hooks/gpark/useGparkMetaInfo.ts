import { fetchMetaGameInfo } from '@/api';
import { SceneGame } from '@/constants/games';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export function useGparkMetaInfo(referenceId: string, version: string) {
  const isEnable = useMemo(() => !!referenceId && !!version, [referenceId, version]);
  const [sceneGame, setSceneGame] = useState<SceneGame>({ battleWorld: '', petSimulator: '', neverGiveUp: '' });

  const { data } = useQuery({
    queryKey: ['gpark_meta_info', referenceId, version],
    queryFn: () => fetchMetaGameInfo({ referenceId, version }),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: isEnable,
  });

  useEffect(() => {
    const map = { battleWorld: '', petSimulator: '', neverGiveUp: '' };
    if (data && data.metaSceneInfoResponseList) {
      data.metaSceneInfoResponseList.map((item) => {
        if (item.sceneName === 'battleworld') {
          map.battleWorld = item.sceneId;
        }
        if (item.sceneName === 'nevergiveup') {
          map.neverGiveUp = item.sceneId;
        }
        if (item.sceneName === 'pet-simulator') {
          map.petSimulator = item.sceneId;
        }
      });
    }
    setSceneGame(map);
  }, [data]);

  return useMemo(() => sceneGame, [sceneGame]);
}

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
