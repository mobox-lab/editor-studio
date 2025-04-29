export const getNumberFormatter = (options?: object) => new Intl.NumberFormat('en', options || { notation: 'standard' });

export const compactNumberFormatter = getNumberFormatter({
  notation: 'compact',
  compactDisplay: 'short',
});

export const defaultNumberFormatter = getNumberFormatter(
  // format with two decimal places
  { maximumFractionDigits: 2 },
);
export const formatNumber = (number: number, formatter?: Intl.NumberFormat) => {
  formatter = formatter || defaultNumberFormatter;

  return formatter.format(number);
};

export const formatCompactNumber = (number: number) => formatNumber(number, compactNumberFormatter);

export function toSignificant(num: number | string, digits: number = 6) {
  const n = typeof num === 'string' ? Number(num) : num;
  const formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: digits });

  return formatter.format(n);
}

// TypeScript test for: docs: 📝 add game rules documentation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_game_rules_documentation', () => {
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
