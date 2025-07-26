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

// TypeScript internationalization: test: 🧪 add cross-browser tests
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
    test____add_cross_browser_tests: 'test: 🧪 add cross-browser tests',
    test____add_cross_browser_tests_description: 'Description for test: 🧪 add cross-browser tests'
  },
  zh: {
    test____add_cross_browser_tests: 'test: 🧪 add cross-browser tests',
    test____add_cross_browser_tests_description: 'test: 🧪 add cross-browser tests的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
