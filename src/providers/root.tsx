'use client';

import { PropsWithChildren } from 'react';
import { JotaiStoreProvider } from '@/providers/jotai-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ProviderComposer } from '@/components/common/ProviderComposer';
import { WagmiClientProvider } from '@/providers/wagmi-provider';

const contexts: JSX.Element[] = [
  <WagmiClientProvider key="wagmiClientProvider" />,
  <ReactQueryProvider key="reactQueryProvider" />,
  <JotaiStoreProvider key="jotaiStoreProvider" />,
];

export default function Providers({ children }: PropsWithChildren) {
  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
}
