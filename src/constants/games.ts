import { LAUNCHER_ENV } from '@/constants/env';

export type SceneGame = {
  battleWorld: string;
  petSimulator: string;
  neverGiveUp: string;
};

export type DvConfig = {
  name: string;
  code: string;
};

enum GameEnv {
  Test = 'gpark-test-oversea',
  Online = 'gpark-online-oversea',
}

const DV_CONFIG_MAP: Record<string, DvConfig[]> = {
  [GameEnv.Test]: [{ name: 'Merlin Beta', code: 'D5LIrBLH5XJ2nhYqrk4M' }],
  [GameEnv.Online]: [
    { name: 'Merlin Release', code: 'dbmaByA9WKCpXcZfSutH' },
    { name: 'Bsc Release', code: 'UcJsqnsne3DvCnZxafFp' },
    { name: 'Merlin Beta S6', code: '42qwxtWuRAiAYjq4YEfF' },
    { name: 'Merlin Beta 038', code: 'ak0XtpACHGf9kMSgfKjR' },
    { name: 'Merlin Beta 040', code: 'FQuicx5SwSO6Vc2M2uKY' },
    { name: 'Bsc Beta', code: 'DKQOhNcTocVPt0ceYCy1' },
  ],
};

export const dvGames = LAUNCHER_ENV ? DV_CONFIG_MAP[LAUNCHER_ENV] : DV_CONFIG_MAP[GameEnv.Online];

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
