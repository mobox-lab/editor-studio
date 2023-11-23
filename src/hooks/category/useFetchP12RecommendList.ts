import { fetchP12GameRecommendList } from '@/api';
import { categoryPremiumListAtom } from '@/atoms/category/arcana';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export const useFetchP12RecommendList = () => {
  const setPremiumData = useSetAtom(categoryPremiumListAtom);

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ['fetch_p12_game_recommend_list'],
    queryFn: () => fetchP12GameRecommendList(),
    select: (res) => (res.code === 200 ? res.data : []),
  });

  useEffect(() => {
    if (isSuccess) {
      setPremiumData(data);
    }
  }, [data, isSuccess, setPremiumData]);

  return useMemo(() => ({ isLoading }), [isLoading]);
};
