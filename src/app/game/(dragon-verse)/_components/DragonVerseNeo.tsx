import { DragonNeoMenu } from '@/components/ui/menu/DragonNeoMenu';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useChangeDragonNeoMenu } from '@/hooks/dragon/useChangeDragonNeoMenu';
import { clsxm } from '@/utils';
import { useEffect, useRef } from 'react';
import DragonBorder from './DragonBorder';
import DragonGameRank from './DragonGameRank';
import DragonVerseGovernance from './DragonVerseGovernance';

export default function DragonVerseNeo({ className }: { className?: string }) {
  const { activeMenuItem } = useChangeDragonNeoMenu();
  const gameRankRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeMenuItem === DragonNeoMenuItem.Governance) {
      governanceRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (activeMenuItem === DragonNeoMenuItem.GameRank) {
      gameRankRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [activeMenuItem, gameRankRef, governanceRef]);

  return (
    <>
      <DragonNeoMenu className="mt-12" />
      <div
        ref={governanceRef}
        className={clsxm('relative mt-12 border border-gray-400 bg-gray-550/10 p-6 px-7.5 py-11', className)}
      >
        <DragonBorder className="inset-2 -z-10" />
        <DragonVerseGovernance />
      </div>
      <div
        ref={gameRankRef}
        className={clsxm('relative mb-52 mt-12 border border-gray-400 bg-gray-550/10 px-10 py-13', className)}
      >
        <DragonBorder className="inset-2 -z-10" />
        <DragonGameRank />
      </div>
    </>
  );
}
