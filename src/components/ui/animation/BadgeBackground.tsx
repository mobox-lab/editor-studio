import { tv } from 'tailwind-variants';

type BadgeBackgroundProps = {
  level?: string;
};

const background = tv({
  base: 'absolute -left-[85%] -top-1/2 -z-10 h-[758px] w-[958px] animate-breathing rounded-full blur-[200px]',
  variants: {
    bg: {
      Legendary: 'bg-legendary',
      Epic: 'bg-epic',
      Rare: 'bg-rare',
      Uncommon: 'bg-uncommon',
      Common: 'bg-common',
    },
  },
});

export default function BadgeBackground({ level }: BadgeBackgroundProps = { level: 'Common' }) {
  return <div className={background({ bg: level as any })} />;
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
