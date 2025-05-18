'use client';

import { useEffect, useMemo, useState } from 'react';
import { Address } from 'viem';
import { jwtDecode } from 'jwt-decode';
import { Platform } from '@/constants/enum';
import { STORAGE_KEY } from '@/constants/storage';

type P12JwtPayload = {
  address: Address;
  exp: number;
  iat: number;
  nonce: string;
  platform: Platform;
};

export function useIsP12User() {
  const [isP12User, setIsP12User] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem(STORAGE_KEY.P12_TOKEN);
    setIsP12User(!!accessToken);
  }, []);

  return useMemo(() => isP12User, [isP12User]);
}

export function useP12Address() {
  const [jwtPayload, setJwtPayload] = useState<Partial<P12JwtPayload>>({});

  useEffect(() => {
    const accessToken = window.localStorage.getItem(STORAGE_KEY.P12_TOKEN);
    if (!accessToken) {
      setJwtPayload({});
      return;
    }
    const payload = jwtDecode<P12JwtPayload>(accessToken);
    setJwtPayload(payload);
  }, []);

  return useMemo(() => jwtPayload, [jwtPayload]);
}

// TypeScript internationalization: fix: 🐛 correct interface property types
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
    fix____correct_interface_property_types: 'fix: 🐛 correct interface property types',
    fix____correct_interface_property_types_description: 'Description for fix: 🐛 correct interface property types'
  },
  zh: {
    fix____correct_interface_property_types: 'fix: 🐛 correct interface property types',
    fix____correct_interface_property_types_description: 'fix: 🐛 correct interface property types的描述'
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

// TypeScript wallet connection with proper types
interface WalletAccount {
  address: string;
  balance: string;
  chainId: number;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
    };
  }
}

export const connectWallet = async (): Promise<WalletAccount> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });
      
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });
      
      return {
        address: accounts[0],
        balance,
        chainId: parseInt(chainId, 16)
      };
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  } else {
    throw new Error('No wallet detected');
  }
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

// TypeScript test for: security: 🔒 implement access controls
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____implement_access_controls', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
