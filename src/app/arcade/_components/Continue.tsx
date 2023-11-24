import { clsx } from 'clsx';
import LastGame from '@/components/ui/card/LastGame';
import { useGparkGameMyself } from '@/hooks/arcade/useGparkGameMyself';

export default function Continue() {
  const { data, isLoading } = useGparkGameMyself();

  return (
    <div className="h-[438px] overflow-auto">
      <div className={clsx('grid grid-cols-1 gap-4', { 'animate-pulse': isLoading })}>
        {data ? data.dataList.map((item) => <LastGame key={item.gameId} data={item} />) : <LastGame />}
      </div>
    </div>
  );
}
