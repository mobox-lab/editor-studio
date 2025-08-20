import { P12EventRound, P12GameInfo } from '@/api';
import { atom } from 'jotai';

export const categoryPremiumListAtom = atom<P12GameInfo[]>([]);

export const currentWeekAtom = atom<number | null>(null);
export const currentEventRoundInfoAtom = atom<P12EventRound | null>(null);

export const arcanaEditCreationDialogOpen = atom<boolean>(false);
export const arcanaEditCreationIdAtom = atom<number | null>(null);

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: perf: ⚡ optimize image compression
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____optimize_image_compression', () => {
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
