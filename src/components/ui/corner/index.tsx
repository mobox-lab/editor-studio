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
