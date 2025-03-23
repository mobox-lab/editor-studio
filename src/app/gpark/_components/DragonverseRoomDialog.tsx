import { useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@/components/ui/dialog';
import { SceneGame } from '@/constants/games';
import RefreshSVG from '@/../public/svg/refresh.svg?component';
import SceneRoomItem from '@/app/gpark/_components/SceneRoomItem';
import { dragonverseRoomDialogOpen, dvGameConfig } from '@/atoms/gpark/dragonverse';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';
import DragonRoomItem from '@/app/game/(dragon-verse)/_components/DragonRoomItem';

type DragonverseRoomDialogProps = {
  version?: string;
  sceneGames?: SceneGame;
};

export default function DragonverseRoomDialog({ version, sceneGames }: DragonverseRoomDialogProps) {
  const game = useAtomValue(dvGameConfig);
  const [open, setOpen] = useAtom(dragonverseRoomDialogOpen);
  const params = useMemo(() => ({ maxId: '0', pageSize: 20, sortType: 0, version }), [version]);

  const { data: mainRooms, refetch: mainRefetch } = useGparkGameRoomList({ ...params, gameId: game.code });
  // const { data: bwRooms, refetch: bwRefresh } = useGparkGameRoomList({ ...params, sceneId: sceneGames?.battleWorld });
  const { data: tdRooms, refetch: tdRefresh } = useGparkGameRoomList({ ...params, sceneId: sceneGames?.neverGiveUp });
  const { data: psRooms, refetch: psRefresh } = useGparkGameRoomList({ ...params, sceneId: sceneGames?.petSimulator });

  const mainRoomList = useMemo(() => mainRooms?.dataList ?? [], [mainRooms?.dataList]);
  // const bwRoomList = useMemo(() => bwRooms?.dataList ?? [], [bwRooms?.dataList]);
  const tdRoomList = useMemo(() => tdRooms?.dataList ?? [], [tdRooms?.dataList]);
  const psRoomList = useMemo(() => psRooms?.dataList ?? [], [psRooms?.dataList]);

  const onRefreshClick = () => {
    mainRefetch().then();
    // bwRefresh().then();
    tdRefresh().then();
    psRefresh().then();
    toast.success('Room refresh successful');
  };

  return (
    <Dialog
      title="Room List"
      open={open}
      onOpenChange={(open) => setOpen(open)}
      render={() => (
        <div className="px-6 py-7.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm/4 font-semibold">
              <img src="/img/gpark/dv-icon.webp" alt="dv" className="w-7" />
              Dragonverse Neo
            </div>
            <div className="flex-center h-7 w-7 cursor-pointer bg-white/10" onClick={onRefreshClick}>
              <RefreshSVG className="fill-white" />
            </div>
          </div>
          <div className="mt-3 flex w-[708px] gap-3 overflow-auto pb-2">
            {mainRoomList.length ? (
              mainRoomList.map((room) => (
                <DragonRoomItem key={room.roomId} data={room} className="w-[168px]" refetchRoomList={mainRefetch} />
              ))
            ) : (
              <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">
                NO ROOM
              </div>
            )}
          </div>
          <div className="mt-5.5 grid grid-cols-2 gap-3">
            {/*<div>*/}
            {/*  <div className="flex items-center gap-1.5 text-sm/4 font-semibold">*/}
            {/*    <img src="/img/gpark/bw-icon.webp" alt="bw" className="w-7" />*/}
            {/*    Infinity Ramble*/}
            {/*  </div>*/}
            {/*  <div className="mt-3 grid gap-3">*/}
            {/*    {bwRoomList.length ? (*/}
            {/*      bwRoomList.map((room) => <SceneRoomItem key={room.roomId} data={room} />)*/}
            {/*    ) : (*/}
            {/*      <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">*/}
            {/*        NO ROOM*/}
            {/*      </div>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div>
              <div className="flex items-center gap-1.5 text-sm/4 font-semibold">
                <img src="/img/gpark/td-icon.webp" alt="td" className="w-7"/>
                Dragon Defense
              </div>
              <div className="mt-3 grid gap-3">
                {tdRoomList.length ? (
                  tdRoomList.map((room) => <SceneRoomItem key={room.roomId} data={room}/>)
                ) : (
                  <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">
                    NO ROOM
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm/4 font-semibold">
                <img src="/img/gpark/ps-icon.webp" alt="ps" className="w-7" />
                Dream Pets
              </div>
              <div className="mt-3 grid gap-3">
                {psRoomList.length ? (
                  psRoomList.map((room) => <SceneRoomItem key={room.roomId} data={room} />)
                ) : (
                  <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">
                    NO ROOM
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}

<<<<<<< HEAD
// TypeScript internationalization: perf: ⚡ improve bundle splitting
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
    perf____improve_bundle_splitting: 'perf: ⚡ improve bundle splitting',
    perf____improve_bundle_splitting_description: 'Description for perf: ⚡ improve bundle splitting'
  },
  zh: {
    perf____improve_bundle_splitting: 'perf: ⚡ improve bundle splitting',
    perf____improve_bundle_splitting_description: 'perf: ⚡ improve bundle splitting的描述'
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

// TypeScript React component methods for: chore: 🔧 update dependencies
interface chore____update_dependenciesProps {
=======
// TypeScript React component methods for: fix: 🐛 resolve wallet connection timeout
interface fix____resolve_wallet_connection_timeoutProps {
>>>>>>> feature/game-leaderboard
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

<<<<<<< HEAD
interface chore____update_dependenciesState {
=======
interface fix____resolve_wallet_connection_timeoutState {
>>>>>>> feature/game-leaderboard
  isLoading: boolean;
  data: any;
  error: Error | null;
}

<<<<<<< HEAD
export const usechore____update_dependencies = () => {
  const [state, setState] = useState<chore____update_dependenciesState>({
=======
export const usefix____resolve_wallet_connection_timeout = () => {
  const [state, setState] = useState<fix____resolve_wallet_connection_timeoutState>({
>>>>>>> feature/game-leaderboard
    isLoading: false,
    data: null,
    error: null
  });

<<<<<<< HEAD
  const handlechore____update_dependencies = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____update_dependencies');
=======
  const handlefix____resolve_wallet_connection_timeout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_wallet_connection_timeout');
>>>>>>> feature/game-leaderboard
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
<<<<<<< HEAD
    handlechore____update_dependencies
=======
    handlefix____resolve_wallet_connection_timeout
>>>>>>> feature/game-leaderboard
  };
};

// TypeScript utility function: style: 💄 update layout grid system
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

export const style____update_layout_grid_system: UtilityFunctions = {
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

// TypeScript utility function: style: 💄 add micro-interactions
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

export const style____add_micro_interactions: UtilityFunctions = {
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

// TypeScript React component methods for: feat: ✨ implement TypeScript decorators for validation
interface feat____implement_TypeScript_decorators_for_validationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____implement_TypeScript_decorators_for_validationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____implement_TypeScript_decorators_for_validation = () => {
  const [state, setState] = useState<feat____implement_TypeScript_decorators_for_validationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____implement_TypeScript_decorators_for_validation = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____implement_TypeScript_decorators_for_validation');
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
    handlefeat____implement_TypeScript_decorators_for_validation
  };
};
