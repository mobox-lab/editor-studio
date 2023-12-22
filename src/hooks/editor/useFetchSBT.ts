import { fetchP12SBT } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchSBT = (nftType: 'gamer' | 'developer') => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_sbt'],
    queryFn: () => fetchP12SBT(nftType),
    select: (res) => (res.code === 200 ? res.data : null),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};
