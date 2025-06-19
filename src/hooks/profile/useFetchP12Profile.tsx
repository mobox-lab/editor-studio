import { fetchP12ProfileData } from '@/api';
import { p12ProfileAtom } from '@/atoms/profile';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export const useFetchP12Profile = () => {
  const setUserProfile = useSetAtom(p12ProfileAtom);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['fetch_p12_profile_data'],
    queryFn: () => fetchP12ProfileData(),
  });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setUserProfile(data?.data);
    }
  }, [isSuccess, data, setUserProfile]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript utility function: fix: 🐛 resolve data synchronization bug
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

export const fix____resolve_data_synchronization_bug: UtilityFunctions = {
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
