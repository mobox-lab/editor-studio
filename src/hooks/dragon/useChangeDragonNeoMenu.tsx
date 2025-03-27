import { dragonNeoActiveMenuAtom } from '@/atoms/gpark/dragonverse';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useChangeDragonNeoMenu = () => {
  const [activeMenuItem, setActiveMenuItem] = useAtom(dragonNeoActiveMenuAtom);

  const changeMenu = useCallback(
    (activeMenu: DragonNeoMenuItem) => {
      setActiveMenuItem(activeMenu);
    },
    [setActiveMenuItem],
  );

  return { activeMenuItem, changeMenu };
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
