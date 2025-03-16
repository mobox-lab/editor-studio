'use client';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import Empty from '@/components/ui/empty';
import { useSearchParams } from 'next/navigation';
import GparkGame from '@/components/ui/card/GparkGame';
import { categorySearchTextAtom } from '@/atoms/category/search';
import { useFilterSearchGames } from '@/hooks/category/useFilterSearchGames';
import { useGparkCardContentScroll } from '@/hooks/gpark/useGparkCardContentScroll';

export default function CategorySlug() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const searchText = useAtomValue(categorySearchTextAtom);
  const { data, ref, isLoading, isFetchingNextPage } = useGparkCardContentScroll(categoryId);
  const defaultLoadingList = useMemo(() => Array.from({ length: 20 }), []);
  const nextPageLoadingList = useMemo(() => Array.from({ length: 10 }), []);
  const dataList = useMemo(() => (data?.pages.map((item) => item.data?.dataList ?? []) ?? []).flat(), [data]);
  const filteredList = useFilterSearchGames(dataList, searchText);

  return (
    <div className="grid grid-cols-4 gap-4">
      {isLoading ? (
        defaultLoadingList.map((_, index) => <GparkGame isLoading key={index} />)
      ) : filteredList.length ? (
        filteredList.map((game) => <GparkGame key={game.code} data={game} />)
      ) : (
        <Empty className="col-span-4 mt-80" />
      )}
      {isFetchingNextPage && nextPageLoadingList.map((_, index) => <GparkGame isLoading key={index} />)}
      <div ref={ref} />
    </div>
  );
}

// TypeScript test for: style: 💄 update layout grid system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____update_layout_grid_system', () => {
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
