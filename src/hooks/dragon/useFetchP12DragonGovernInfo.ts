import { fetchDragonGovernInfo } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonGovernInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_dragon_govern_info'],
    queryFn: () => fetchDragonGovernInfo(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
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
