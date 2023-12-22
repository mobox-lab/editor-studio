import { fetchGparkUserImage } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useGparkUserImage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetch_gpark_user_image'],
    queryFn: () => fetchGparkUserImage(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
}
