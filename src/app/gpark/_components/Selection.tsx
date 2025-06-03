'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useInterval } from 'react-use';
import { openExternalLink } from '@/utils';
import { useRouter } from 'next/navigation';
import { P12SelectionGameInfo } from '@/api';
import { useP12SelectionGames } from '@/hooks/gpark/useP12SelectionGames';

export default function Selection() {
  const { data, isLoading } = useP12SelectionGames();
  const [lists, setLists] = useState<P12SelectionGameInfo[]>([]);
  const selectedGame = useMemo(() => lists[0], [lists]);
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !data?.length) return;
    setLists(data);
  }, [data, isLoading]);

  useInterval(() => {
    if (!lists?.length) return;
    const newList = lists.slice(1);
    newList.push(lists[0]);
    setLists(newList);
  }, 4000);

  return (
    <div className="flex-1">
      <h3 className="text-base font-medium">Featured</h3>
      <div
        className={clsx('mt-3 h-93 flex-none cursor-pointer border border-gray-500 hover:border-gray-350', {
          'animate-pulse': isLoading,
        })}
        onClick={() => {
          selectedGame?.externalLink
            ? openExternalLink(selectedGame.externalLink)
            : router.push(`/game/${selectedGame?.mwGameCode}`);
        }}
      >
        <div className="relative h-80 w-full bg-gray-500">
          {selectedGame ? <img className="h-full w-full object-cover" src={selectedGame.mainImage} alt="game-image" /> : null}
        </div>
        <div className="relative p-4">
          <div className="absolute bottom-4 left-4 h-15 w-15 overflow-hidden rounded-lg border-2 border-gray-700 bg-gray-500">
            {selectedGame ? <img className="h-full w-full object-cover" src={selectedGame.gameIcon} alt="game-image" /> : null}
          </div>
          <div className="ml-15 flex items-center justify-between">
            <p className="pl-3 text-base/5 font-semibold">{selectedGame?.gameName}</p>
            <p className="text-xs text-gray-300">By {selectedGame?.showName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript React component methods for: perf: ⚡ optimize database connections
interface perf____optimize_database_connectionsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface perf____optimize_database_connectionsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const useperf____optimize_database_connections = () => {
  const [state, setState] = useState<perf____optimize_database_connectionsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handleperf____optimize_database_connections = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/perf____optimize_database_connections');
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
    handleperf____optimize_database_connections
  };
};
