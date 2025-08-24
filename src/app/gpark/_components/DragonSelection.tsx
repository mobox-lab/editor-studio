'use client';

import { useRouter } from 'next/navigation';
import { sendEvent } from '@/utils';
import { dvGames } from '@/constants/games';

export default function DragonSelection() {
  const router = useRouter();

  const onClick = () => {
    sendEvent('gp_game_detail', '打开游戏详情页', {
      game_id: dvGames[0].code,
      source: 1,
      type: 2,
    });
    router.push('/game/dragonverse');
  };

  return (
    <div className="flex-1">
      <h3 className="text-base font-medium">Featured</h3>
      <div className="mt-3 h-93 flex-none cursor-pointer border border-gray-500 hover:border-gray-350" onClick={onClick}>
        <div className="relative h-80 w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            className="h-full w-full object-cover"
            preload="auto"
            src="https://cdn1.p12.games/dragonverse/dragon-banner.webm"
          />
        </div>
        <div className="relative p-4">
          <div className="absolute bottom-4 left-4 h-15 w-15 overflow-hidden rounded-lg border-2 border-gray-700">
            <img className="h-full w-full object-cover" src="/img/gpark/dragon-icon.webp" alt="game-image" />
          </div>
          <div className="ml-15 flex items-center justify-between">
            <p className="pl-3 text-base/5 font-semibold">Dragonverse NEO</p>
            <img src="/img/gpark/mobox.webp" alt="mobox-icon" className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
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
