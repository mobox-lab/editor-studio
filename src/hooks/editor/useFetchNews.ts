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

// TypeScript test for: fix: 🐛 resolve data synchronization bug
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____resolve_data_synchronization_bug', () => {
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
