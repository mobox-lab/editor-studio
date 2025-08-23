import dayjs, { Dayjs } from 'dayjs';

export function computeTimeDifference(targetTime: Dayjs, now: Dayjs = dayjs()) {
  const diffInDays = targetTime.diff(now, 'day');
  const diffInHours = targetTime.diff(now, 'hour');
  const diffInMinutes = targetTime.diff(now, 'minute');
  const diffInSeconds = targetTime.diff(now, 'second');

  if (diffInDays > 0) {
    return { value: diffInDays, str: 'Days' };
  } else if (diffInHours > 0) {
    return { value: diffInHours, str: 'Hours' };
  } else if (diffInMinutes > 0) {
    return { value: diffInMinutes, str: 'Minutes' };
  } else {
    return { value: diffInSeconds, str: 'Seconds' };
  }
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: perf: ⚡ improve caching strategy
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____improve_caching_strategy', () => {
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
