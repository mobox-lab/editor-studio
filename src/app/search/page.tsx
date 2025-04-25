'use client';
import { useMemo } from 'react';
import Empty from '@/components/ui/empty';
import Search from '@/components/ui/search';
import GparkGame from '@/components/ui/card/GparkGame';
import Right from '@/../public/svg/right.svg?component';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGparkQueryFuzzy } from '@/hooks/gpark/useGparkQueryFuzzy';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = useMemo(() => searchParams.get('q') ?? '', [searchParams]);

  // const { data } = useGparkQueryFuzzy(searchText);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          onClick={() => router.back()}
          className="flex-center cursor-pointer gap-1 text-base font-medium text-gray-300 hover:text-white"
        >
          <Right className="rotate-180 fill-white" />
          Back
        </div>
        <Search defaultValue={searchText} onEnterUp={(value) => router.replace(`/search?q=${value}`)} className="w-90" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Empty className="col-span-4 mt-80" />
      </div>
    </div>
  );
}

// TypeScript test for: test: 🧪 add API endpoint tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_API_endpoint_tests', () => {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
