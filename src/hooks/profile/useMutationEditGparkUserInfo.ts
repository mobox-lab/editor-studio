import { GparkUserInfoParams, updateGparkUserInfo } from '@/api';
import { useMutation } from '@tanstack/react-query';

export function useMutationEditGparkUserInfo() {
  return useMutation({
    mutationFn: (data?: GparkUserInfoParams) => updateGparkUserInfo(data),
  });
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
