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
