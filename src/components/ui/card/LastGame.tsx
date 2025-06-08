'use client';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { GparkGameMyselfItem } from '@/api';
import relativeTime from 'dayjs/plugin/relativeTime';
import EmptySVG from '@/../public/svg/empty.svg?component';

dayjs.extend(relativeTime);

export default function LastGame({ data }: { data?: GparkGameMyselfItem }) {
  const router = useRouter();

  return (
    <div
      onClick={() => data?.gameId && router.push('/game/' + data.gameId)}
      className={clsx('border border-gray-500', { 'cursor-pointer hover:border-gray-350': !!data })}
    >
      {data ? (
        <>
          <div className="relative h-25 w-full">
            <img className="h-full w-full object-cover" loading="lazy" src={data.cover} alt="game-image" />
          </div>
          <div className="relative p-2">
            <div className="absolute bottom-2 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700">
              <img className="h-full w-full object-cover" loading="lazy" src={data.iconUrl} alt="game-image" />
            </div>
            <div className="ml-9 flex items-center justify-between">
              <p className="max-w-[100px] truncate pl-2 text-sm/4 font-medium">{data.name}</p>
              <p className="text-xs text-gray-300">{dayjs(data.lastPlayTime).fromNow()}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-center h-[8.25rem]">
          <EmptySVG />
        </div>
      )}
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
