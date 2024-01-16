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
