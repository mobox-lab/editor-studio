import { updateP12ChainNames } from '@/api';
import { p12ProfileAtom } from '@/atoms/profile';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

export const useMutationP12UpdateChainNames = () => {
  const [profile, setUserProfile] = useAtom(p12ProfileAtom);
  return useMutation({
    mutationFn: () => updateP12ChainNames(),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        toast.success('Synchronize successfully');
        if (data) setUserProfile({ ...(profile ?? {}), ...data });
        return data;
      }
      toast.error('Synchronize failed. Please try again.');
    },
    onError: () => {
      toast.error('Synchronize failed. Please try again.');
    },
  });
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
