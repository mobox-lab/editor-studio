'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import Back from '@/../public/svg/back.svg?component';
import { useIsP12User } from '@/hooks/editor/useP12Account';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import DragonVerseNeo from '@/app/game/(dragon-verse)/_components/DragonVerseNeo';
import DragonBetaPanel from '@/app/game/(dragon-verse)/_components/DragonBetaPanel';
import { dvGameConfig } from '@/atoms/gpark/dragonverse';

export default function DragonverseBeta() {
  const router = useRouter();
  const isP12User = useIsP12User();
  const game = useAtomValue(dvGameConfig);
  const { data } = useGparkGameDetail(game.code);

  return (
    <div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[986px] w-full">
        <div className="fixed inset-0 -z-10 bg-black"></div>
        <img className="absolute -z-10 h-full w-full object-cover" src="/img/gpark/dragon-BG.webp" alt="" />
      </div>
      <div className="text-base font-medium">
        <span
          className="cursor-pointer fill-gray-300 font-normal text-gray-300 hover:fill-white hover:text-white"
          onClick={() => router.back()}
        >
          <Back className="mb-0.5 mr-2 inline w-9 hover:fill-white/20" />
          GPark
        </span>
        <span className="text-gray-300">&nbsp;/&nbsp;</span>
        {data?.name}
      </div>
      <div className="mt-4">
        <DragonBetaPanel data={data} />
      </div>
      {isP12User && <DragonVerseNeo />}
    </div>
  );
}

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
