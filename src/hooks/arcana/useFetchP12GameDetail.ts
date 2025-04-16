import { fetchP12GameDetail } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

type useFetchGameDetailProps = {
  id?: number | null;
  onSuccess?: (data: any) => void;
};

export const useFetchP12GameDetail = ({ id, onSuccess }: useFetchGameDetailProps) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['fetch_p12_game_detail', id],
    queryFn: () => fetchP12GameDetail(id as number),
    enabled: !!id,
    select: ({ code, data }) => (code === 200 ? data : undefined),
    gcTime: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data);
    }
  }, [isSuccess, data, onSuccess]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript utility function: feat: ✨ implement TypeScript decorators for validation
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

export const feat____implement_TypeScript_decorators_for_validation: UtilityFunctions = {
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
