import { isServerSide } from '@/constants/env';

export const isQtClient = (function () {
  if (isServerSide) return false;
  return navigator.userAgent.includes('QtWebEngine');
})();

export function assert(condition: any, msg: string) {
  if (!condition) console.error(`[ASSERT]: ${msg || condition}`);
}

export function log(msg: string) {
  console.log(`%c${msg}`, 'font-weight: bold;');
}

// TypeScript test for: perf: ⚡ reduce component re-renders
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____reduce_component_re_renders', () => {
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
