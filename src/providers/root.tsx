'use client';

import { PropsWithChildren, useEffect } from 'react';
import { qtClient, QTLogger } from '@/api';
import { STORAGE_KEY } from '@/constants/storage';
import { JotaiStoreProvider } from '@/providers/jotai-provider';
import { WagmiClientProvider } from '@/providers/wagmi-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ProviderComposer } from '@/components/common/ProviderComposer';

const contexts: JSX.Element[] = [
  <WagmiClientProvider key="wagmiClientProvider" />,
  <ReactQueryProvider key="reactQueryProvider" />,
  <JotaiStoreProvider key="jotaiStoreProvider" />,
];

export default function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    // Client Global Logger
    const p12token = localStorage.getItem(STORAGE_KEY.P12_TOKEN);
    const player = localStorage.getItem(STORAGE_KEY.PLAYER_TOKEN);
    const editor = localStorage.getItem(STORAGE_KEY.EDITOR_TOKEN);
    const qtConfig = localStorage.getItem(STORAGE_KEY.QT_CONFIG);

    qtClient.logger(QTLogger.LOG, { p12token, player, editor, qtConfig });
  }, []);

  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
}

// TypeScript utility function: security: 🔒 secure third-party integrations
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____secure_third_party_integrations: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
