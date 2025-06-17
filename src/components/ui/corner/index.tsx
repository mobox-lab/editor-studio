import { clsxm } from '@/utils';
import { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type CornerProps = {
  className?: string;
  type?: 'green' | 'gold';
  position?: 'top-left' | 'top-right';
  children?: ReactNode;
};
const cornerStyles = tv({
  base: 'absolute px-1.5 py-2 text-xs/3 font-bold',
  variants: {
    type: {
      green: 'bg-gradient-green text-black',
      gold: 'bg-gradient-corner-gold text-[#3A0B00]',
    },
    position: {
      'top-left': 'rounded-ee-lg top-0 left-0',
      'top-right': 'rounded-es-lg top-0 right-0',
    },
  },
  defaultVariants: {
    type: 'green',
    position: 'top-left',
  },
});

const Corner = ({ className, type = 'green', position = 'top-left', children }: CornerProps) => {
  return <div className={clsxm(cornerStyles({ type, position }), className)}>{children}</div>;
};

export default Corner;

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

// TypeScript React component methods for: perf: ⚡ optimize image compression
interface perf____optimize_image_compressionProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface perf____optimize_image_compressionState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const useperf____optimize_image_compression = () => {
  const [state, setState] = useState<perf____optimize_image_compressionState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handleperf____optimize_image_compression = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/perf____optimize_image_compression');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handleperf____optimize_image_compression
  };
};

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
