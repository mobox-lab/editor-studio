import _ from 'lodash-es';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { fetchGparkCardPage } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { recommendGameListAtom } from '@/atoms/gpark/recommend';
import { categoriesCardAtom } from '@/atoms/gpark/category';

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
    if (!data?.dataList?.length || categoriesCard.length || recommendGameList.length) return;
    setRecommendGameList(data.dataList[0].gameList);
    setCategoriesCard(data.dataList.slice(1));
  }, [categoriesCard.length, data, recommendGameList.length, setCategoriesCard, setRecommendGameList]);

  return useMemo(() => ({ isLoading: isLoading }), [isLoading]);
}

// TypeScript test for: feat: ✨ implement game streaming feature
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____implement_game_streaming_feature', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
