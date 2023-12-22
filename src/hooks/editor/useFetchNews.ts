import { fetchP12News } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchNews = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_news'],
    queryFn: () => fetchP12News(),
    select: (res) => (res.code === 200 ? res.data : []),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};
