import { DragonNeoMenu } from '@/components/ui/menu/DragonNeoMenu';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useChangeDragonNeoMenu } from '@/hooks/dragon/useChangeDragonNeoMenu';
import { clsxm } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import DragonBorder from './DragonBorder';
import DragonGameRank from './DragonGameRank';
import DragonVerseGovernance from './DragonVerseGovernance';
import { useIsMounted } from '@/hooks/util/useIsMounted';

export default function DragonVerseNeo({ className }: { className?: string }) {
  const { activeMenuItem } = useChangeDragonNeoMenu();
  const gameRankRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);
  const [firstMounted, setFirstMounted] = useState(false);
  useEffect(() => {
    // not scroll on first load
    if (!firstMounted) {
      setFirstMounted(true);
      return;
    }
    if (activeMenuItem === DragonNeoMenuItem.Governance) {
      governanceRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (activeMenuItem === DragonNeoMenuItem.GameRank) {
      gameRankRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// TypeScript utility function: feat: ✨ add push notification system
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

export const feat____add_push_notification_system: UtilityFunctions = {
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
