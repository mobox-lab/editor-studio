import Link from 'next/link';
import { useMemo } from 'react';
import { GparkCardItem } from '@/api';
import Right from '@/../public/svg/right.svg?component';
import GparkGame from '@/components/ui/card/GparkGame';
import Empty from '@/components/ui/empty';

type CategoryItemProps = {
  category: string;
  data?: GparkCardItem;
};
export default function CategoryItem({ category, data }: CategoryItemProps) {
  const defaultList = useMemo(() => Array.from({ length: 4 }), []);
  const { gameList } = data ?? {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{category}</h3>
        <Link className="text-sm font-medium" href={`/category/${data?.cardName}?id=${data?.cardId}`}>
          More
          <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4">
        {gameList ? (
          gameList?.length ? (
            gameList.slice(0, 4).map((game) => <GparkGame key={game.code} data={game} />)
          ) : (
            <Empty />
          )
        ) : (
          defaultList.map((_, index) => <GparkGame key={index} />)
        )}
      </div>
    </div>
  );
}
