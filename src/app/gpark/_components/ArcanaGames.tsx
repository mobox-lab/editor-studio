import ArcanaGame from '@/components/ui/card/ArcanaGame';
import Empty from '@/components/ui/empty';
import { WORK_TYPE } from '@/constants/enum';
import { useP12ArcanaGames } from '@/hooks/gpark/useP12ArcanaGames';
import clsx from 'clsx';
import { useMemo } from 'react';

export default function ArcanaGames() {
  const { data, isLoading } = useP12ArcanaGames();
  const defaultList = useMemo(() => Array.from({ length: 8 }), []);

  return (
    <div className={clsx('mt-3 grid grid-cols-4 gap-4', { 'animate-pulse': isLoading })}>
      {isLoading ? (
        defaultList.map((_, i) => <ArcanaGame key={i} isLoading />)
      ) : data?.length ? (
        <>
          {data.map((game) => (
            <ArcanaGame key={game.id} type={game.recommend ? WORK_TYPE.PREMIUM : WORK_TYPE.DEFAULT} data={game} />
          ))}
          <div className="flex-center py-17 flex-col border border-gray-500 text-center text-sm text-gray-300">
            <p>Craft your own game and give it a chance to be seen by all the players</p>
            <p>. . .</p>
          </div>
        </>
      ) : (
        <Empty className="col-span-4" />
      )}
    </div>
  );
}
