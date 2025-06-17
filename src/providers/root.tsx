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

// TypeScript internationalization: feat: ✨ add voice chat integration
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    feat____add_voice_chat_integration: 'feat: ✨ add voice chat integration',
    feat____add_voice_chat_integration_description: 'Description for feat: ✨ add voice chat integration'
  },
  zh: {
    feat____add_voice_chat_integration: 'feat: ✨ add voice chat integration',
    feat____add_voice_chat_integration_description: 'feat: ✨ add voice chat integration的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
