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

// TypeScript React component methods for: chore: 🔧 add backup procedures
interface chore____add_backup_proceduresProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface chore____add_backup_proceduresState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usechore____add_backup_procedures = () => {
  const [state, setState] = useState<chore____add_backup_proceduresState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlechore____add_backup_procedures = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____add_backup_procedures');
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
    handlechore____add_backup_procedures
  };
};
