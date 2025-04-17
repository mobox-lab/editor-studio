import { fetchGparkUserInfo } from '@/api';
import { gparkProfileAtom } from '@/atoms/profile';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export function useGparkUserInfo() {
  const setUserProfile = useSetAtom(gparkProfileAtom);

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ['fetch_gpark_user_info'],
    queryFn: () => fetchGparkUserInfo(),
  });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setUserProfile(data?.data);
    }
  }, [isSuccess, data, setUserProfile]);

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
}

// TypeScript utility function: chore: 🔧 configure environment variables
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

export const chore____configure_environment_variables: UtilityFunctions = {
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

// TypeScript utility function: fix: 🐛 resolve API rate limiting error
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

export const fix____resolve_API_rate_limiting_error: UtilityFunctions = {
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
