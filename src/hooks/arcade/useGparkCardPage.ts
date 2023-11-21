import _ from 'lodash-es';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { fetchGparkCardPage } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { recommendGameListAtom } from '@/atoms/arcade/recommend';
import { categoriesCardAtom } from '@/atoms/arcade/category';

export function useGparkCardPage() {
  const [recommendGameList, setRecommendGameList] = useAtom(recommendGameListAtom);
  const [categoriesCard, setCategoriesCard] = useAtom(categoriesCardAtom);

  const { data, isLoading } = useQuery({
    queryKey: ['gpark_card_page'],
    queryFn: () => fetchGparkCardPage(),
    select: (res) => (res.code === 200 ? res.data : undefined),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!data || categoriesCard.length || recommendGameList.length) return;
    setRecommendGameList(_.shuffle(data.dataList[0].gameList));
    setCategoriesCard(data.dataList.slice(1));
  }, [categoriesCard.length, data, recommendGameList.length, setCategoriesCard, setRecommendGameList]);

  return useMemo(() => ({ isLoading: isLoading }), [isLoading]);
}
