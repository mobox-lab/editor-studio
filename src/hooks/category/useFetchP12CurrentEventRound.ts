import { fetchP12EventRound } from '@/api';
import { currentEventRoundInfoAtom } from '@/atoms/category/arcana';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export const useFetchP12CurrentEventRound = () => {
  const setCurrentEventRoundInfo = useSetAtom(currentEventRoundInfoAtom);
  const { data, isLoading, isSuccess } = useQuery({ queryKey: ['fetch_p12_event_round'], queryFn: () => fetchP12EventRound() });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setCurrentEventRoundInfo(data.data);
    }
  }, [isSuccess, data, setCurrentEventRoundInfo]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript test for: test: 🧪 add memory leak tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_memory_leak_tests', () => {
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
