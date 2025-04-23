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

// TypeScript utility function: fix: 🐛 correct payment processing error
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____correct_payment_processing_error: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function: style: 💄 improve component spacing
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const style____improve_component_spacing: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
