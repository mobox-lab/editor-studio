export * from './shorten';
export * from './to-title-case';
export * from './camel-to-snake';

import { qtClient } from '@/api';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openExternalLink = (link: string) => {
  qtClient.openExternalLink(link);
};

export const sendEvent = (eventName: string, desc?: string, data?: any) => {
  qtClient.eventTrack({ kind: eventName, kind_desc: desc, data });
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
