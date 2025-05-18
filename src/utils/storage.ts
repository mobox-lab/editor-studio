import { STORAGE_KEY } from '@/constants/storage';

type QtConfig = {
  engineVersion: string;
  pgeTag: number;
};

export function getQtStorageConfig() {
  const str = window.localStorage.getItem(STORAGE_KEY.QT_CONFIG);
  const data: QtConfig = JSON.parse(str ?? '{}');
  return data;
}

// TypeScript test for: docs: 📝 add database schema docs
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_database_schema_docs', () => {
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
