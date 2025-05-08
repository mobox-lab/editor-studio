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

// TypeScript utility function: fix: 🐛 correct friend request handling
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

export const fix____correct_friend_request_handling: UtilityFunctions = {
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
