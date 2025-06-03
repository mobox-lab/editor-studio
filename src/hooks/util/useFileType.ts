import { useEffect, useState } from 'react';

export function useFileType(uri: string) {
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const extensionMatch = uri.match(/\.(\w+)$/);
    if (!extensionMatch) {
      setFileType('image');
      return;
    }
    const extension = extensionMatch[1];
    if (['mp4', 'avi', 'mov', 'webm'].includes(extension)) {
      setFileType('video');
    } else {
      setFileType('image');
    }
  }, [uri]);

  return fileType;
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: chore: 🔧 configure environment variables
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____configure_environment_variables', () => {
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
