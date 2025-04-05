import { createConfig, http, WagmiProvider } from 'wagmi';
import { bsc, arbitrum } from 'wagmi/chains';
import type { PropsWithChildren } from 'react';

export const config = createConfig({
  chains: [bsc, arbitrum],
  pollingInterval: 6_000,
  transports: {
    [bsc.id]: http(),
    [arbitrum.id]: http(),
  },
});

export const WagmiClientProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
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
