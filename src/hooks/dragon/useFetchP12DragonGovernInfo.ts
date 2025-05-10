import { fetchDragonGovernInfo } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonGovernInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_dragon_govern_info'],
    queryFn: () => fetchDragonGovernInfo(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
