import Link from 'next/link';
import Right from '@/../public/svg/right.svg?component';
import { useP12Address } from '@/hooks/editor/useP12Account';
import { useMoboxDragons } from '@/hooks/mobox/useMoboxDragonHelp';
import DragonItem from '@/app/game/(dragon-verse)/_components/DragonItem';

export default function DragonBetaDragons() {
  const { address } = useP12Address();
  const { data } = useMoboxDragons({ address });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex-center gap-1">
          <img src="/svg/dragon/dragon.svg" alt="dragon" className="w-6" />
          <span className="font-medium">My MODragon ({data.length})</span>
        </div>
        <div>
          <Link className="flex-center font-medium" target="__blank" href="https://www.mobox.io/#/iframe/dragonmo">
            Go Market
            <Right className="w-3.5 fill-blue" />
          </Link>
        </div>
      </div>
      <div className="mt-3 flex gap-3 overflow-auto">
        {data.length ? (
          data.map((item, index) => <DragonItem key={index} data={item} />)
        ) : (
          <div className="flex-center box-content w-full border border-gray-500 bg-gray-550/10 py-18 text-sm text-gray-300">
            NO DRAGON
          </div>
        )}
      </div>
    </div>
  );
}
