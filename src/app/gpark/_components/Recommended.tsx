import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import GparkGame from '@/components/ui/card/GparkGame';
import { recommendGameListAtom } from '@/atoms/gpark/recommend';

type RecommendedProps = {
  isLoading?: boolean;
};

export default function Recommended({ isLoading }: RecommendedProps) {
  const dataList = useAtomValue(recommendGameListAtom);
  const defaultList = useMemo(() => Array.from({ length: 4 }), []);

  return (
    <div className="w-full">
      <h3 className="text-center text-base font-medium">Recommended Games</h3>
      <div className={clsx('mt-3 grid grid-cols-4 gap-4', { 'animate-pulse': isLoading })}>
        {isLoading
          ? defaultList.map((_, index) => <GparkGame key={index} />)
          : dataList.map((game) => <GparkGame key={game.code} data={game} />)}
      </div>
    </div>
  );
}

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
