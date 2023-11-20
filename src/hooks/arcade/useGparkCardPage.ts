import { useMemo } from 'react';
import { fetchGparkCardPage } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useGparkCardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gpark_card_page'],
    queryFn: () => fetchGparkCardPage(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  const recommendCardData = useMemo(() => (data ? data.dataList[0] : undefined), [data]);
  const categoriesData = useMemo(() => (data ? data.dataList.slice(1) : []), [data]);

  return useMemo(
    () => ({
      recommendCardData,
      categoriesData,
      isLoading,
    }),
    [categoriesData, isLoading, recommendCardData],
  );
}
