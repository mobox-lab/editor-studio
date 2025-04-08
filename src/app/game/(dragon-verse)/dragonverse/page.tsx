'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { dvGames } from '@/constants/games';
import { GparkStartupExtension } from '@/api';
import Back from '@/../public/svg/back.svg?component';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import { useIsP12User } from '@/hooks/editor/useP12Account';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';
import DragonRoomItem from '@/app/game/(dragon-verse)/_components/DragonRoomItem';
import DragonVerseNeo from '@/app/game/(dragon-verse)/_components/DragonVerseNeo';
import DragonGamePanel from '@/app/game/(dragon-verse)/_components/DragonGamePanel';
import DragonVerseBetaDialog from '@/app/game/(dragon-verse)/_components/DragonVerseBetaDialog';

export default function Dragonverse() {
  const gameId = dvGames[0].code;
  const router = useRouter();
  const { data } = useGparkGameDetail(gameId);
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const { handleRunningGame, isLoading } = useRunningGame();
  const { data: rooms, refetch } = useGparkGameRoomList({
    maxId: '0',
    gameId: gameId,
    pageSize: 20,
    sortType: 0,
    version: startup.version,
  });
  const isP12User = useIsP12User();
  return (
    <div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[986px] w-full">
        <div className="fixed inset-0 -z-10 bg-black"></div>
        <img className="absolute -z-10 h-full w-full object-cover" src="/img/gpark/dragon-BG.webp" alt="" />
      </div>
      <div className="text-base font-medium">
        <span
          className="cursor-pointer fill-gray-300 font-normal text-gray-300 hover:fill-white hover:text-white"
          onClick={() => router.back()}
        >
          <Back className="mb-0.5 mr-2 inline w-9 hover:fill-white/20" />
          GPark
        </span>
        <span className="text-gray-300">&nbsp;/&nbsp;</span>
        {data?.name}
      </div>
      <div className="mt-3">
        <DragonGamePanel stop data={data} isLoading={isLoading} handleRunningGame={() => handleRunningGame({ gameId })} />
      </div>
      <div className="mt-7.5">
        <h3 className="text-base font-medium">Rooms</h3>
        <div className="mt-3 flex w-full gap-3 overflow-auto">
          {rooms?.dataList.length ? (
            rooms.dataList.map((room) => <DragonRoomItem stop key={room.podId} data={room} refetchRoomList={refetch} />)
          ) : (
            <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">NO ROOM</div>
          )}
        </div>
      </div>
      {isP12User && <DragonVerseNeo />}
      <DragonVerseBetaDialog />
    </div>
  );
}

// TypeScript React component methods for: chore: 🔧 configure rate limiting
interface chore____configure_rate_limitingProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface chore____configure_rate_limitingState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usechore____configure_rate_limiting = () => {
  const [state, setState] = useState<chore____configure_rate_limitingState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlechore____configure_rate_limiting = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____configure_rate_limiting');
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
    handlechore____configure_rate_limiting
  };
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: fix: 🐛 fix user avatar display issue
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'Description for fix: 🐛 fix user avatar display issue'
  },
  zh: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'fix: 🐛 fix user avatar display issue的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
