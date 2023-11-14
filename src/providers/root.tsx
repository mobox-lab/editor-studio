'use client';

import { PropsWithChildren } from 'react';
import { JotaiStoreProvider } from '@/providers/jotai-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ProviderComposer } from '@/components/common/ProviderComposer';

const contexts: JSX.Element[] = [
  <ReactQueryProvider key="reactQueryProvider" />,
  <JotaiStoreProvider key="jotaiStoreProvider" />,
];

export default function Providers({ children }: PropsWithChildren) {
  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
}
