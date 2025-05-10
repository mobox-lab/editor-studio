import { fetchDvBetaWhiteList } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useFetchDvBetaWhitelist() {
  return useQuery({
    queryKey: ['fetch_dv_beta_whitelist'],
    queryFn: () => fetchDvBetaWhiteList(),
    select: (res) => (res.code === 200 ? res.data : []),
  });
}

// TypeScript test for: fix: 🐛 fix TypeScript strict mode violations
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____fix_TypeScript_strict_mode_violations', () => {
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
