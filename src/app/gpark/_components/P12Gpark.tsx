'use client';

import { useMemo } from 'react';
import Slider from 'react-slick';
import { useSetAtom } from 'jotai/index';
import { openExternalLink } from '@/utils';
import { dvGames } from '@/constants/games';
import { GparkStartupExtension } from '@/api';
import { GAME_ACTIVE_BANNERS } from '@/constants';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import Background from '@/app/gpark/_components/Background';
import ArcanaDress from '@/app/gpark/_components/ArcanaDress';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { dragonverseRoomDialogOpen } from '@/atoms/gpark/dragonverse';
import DragonverseRoomDialog from '@/app/gpark/_components/DragonverseRoomDialog';
import { useGparkMetaInfo } from '@/hooks/gpark/useGparkMetaInfo';

const settings = {
  className: 'slider variable-width',
  variableWidth: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};

export default function P12Gpark() {
  const gameId = dvGames[0].code;
  const { data } = useGparkGameDetail(gameId);
  const setRoomDialog = useSetAtom(dragonverseRoomDialogOpen);
  const { handleRunningGame, isLoading: runningLoading } = useRunningGame();
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const sceneGames = useGparkMetaInfo(startup.PathId, startup.version);

  return (
    <div>
      <Background />
      <div className="relative mt-[182px] flex items-center justify-between">
        <div className="h-[262px] w-[464px] overflow-visible">
          <Slider {...settings}>
            {GAME_ACTIVE_BANNERS.map((banner, index) => (
              <img
                key={banner.title}
                src={banner.img}
                alt={banner.title}
                className="h-[262px] w-[468px] cursor-pointer"
                onClick={() => openExternalLink(banner.url)}
              />
            ))}
          </Slider>
        </div>
        <div className="flex flex-col items-end">
          <ArcanaDress />
          <div className="gradient-red mt-8 flex h-[113px] w-[300px] cursor-not-allowed flex-col items-center">
            {/*<div className="mt-8 flex h-[113px] w-[300px] cursor-not-allowed flex-col items-center !bg-[#2E2E2E]">*/}
            {runningLoading ? (
              <div className="flex-center text-2xl/14 mt-2 h-14 font-semibold">Loading...</div>
            ) : (
              <img
                src="/img/gpark/play-now.webp"
                alt="play now"
                className="mt-2 w-[148px]"
                onClick={() => handleRunningGame?.({ gameId })}
              />
            )}
            <div className="w-full px-3">
              <div className="h-[1px] w-full bg-[#E44B29]" />
              {/*<div className="h-[1px] w-full bg-white/20" />*/}
            </div>
            <div
              onClick={() => setRoomDialog(true)}
              className="flex-center relative h-12 w-full text-sm/5 hover:bg-white/[0.12]"
              // className="flex-center relative h-12 w-full text-sm/5 text-white/20"
            >
              Select to Join Room
            </div>
          </div>
        </div>
      </div>
      <DragonverseRoomDialog version={startup.version} sceneGames={sceneGames} />
    </div>
  );
}

// TypeScript React component methods for: docs: 📝 add testing documentation
interface docs____add_testing_documentationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____add_testing_documentationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____add_testing_documentation = () => {
  const [state, setState] = useState<docs____add_testing_documentationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____add_testing_documentation = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____add_testing_documentation');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handledocs____add_testing_documentation
  };
};
