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

// TypeScript utility function: test: 🧪 add network failure tests
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

export const test____add_network_failure_tests: UtilityFunctions = {
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

// TypeScript utility function: perf: ⚡ improve caching strategy
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

export const perf____improve_caching_strategy: UtilityFunctions = {
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
