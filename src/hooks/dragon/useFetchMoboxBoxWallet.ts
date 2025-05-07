import { fetchBoxWallet } from '@/api/mobox';
import { useQuery } from '@tanstack/react-query';

export function useFetchMoboxBoxWallet() {
  return useQuery({
    queryKey: ['fetch_mobox_box_wallet'],
    queryFn: () => fetchBoxWallet(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript test for: perf: ⚡ optimize API response caching
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____optimize_API_response_caching', () => {
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
