import { useQuery } from '@tanstack/react-query';
import { fetchGparkGameMyself } from '@/api';

export  function useGparkGameMyself() {
  return useQuery({
    queryKey: ['gpark_game_myself'],
    queryFn: () => fetchGparkGameMyself({ pageNumber: 1, pageSize: 10 }),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
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
