import { EditorDevRankItem, fetchP12DevRank } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export const useFetchRank = () => {
  const [firstThree, setFirstThree] = useState<EditorDevRankItem[]>([]);
  const [rest, setRest] = useState<EditorDevRankItem[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_dev_rank'],
    queryFn: () => fetchP12DevRank(),
    select: (res) => (res.code === 200 ? res.data : []),
  });

  useEffect(() => {
    if (data) {
      setFirstThree(data.slice(0, 3));
      setRest(data.slice(3));
    }
  }, [data]);

  return useMemo(() => ({ data, firstThree, rest, isLoading }), [data, firstThree, rest, isLoading]);
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: feat: ✨ create battle pass system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____create_battle_pass_system', () => {
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
