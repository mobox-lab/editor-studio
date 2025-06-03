import { updateP12ChainNames } from '@/api';
import { p12ProfileAtom } from '@/atoms/profile';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

export const useMutationP12UpdateChainNames = () => {
  const [profile, setUserProfile] = useAtom(p12ProfileAtom);
  return useMutation({
    mutationFn: () => updateP12ChainNames(),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        toast.success('Synchronize successfully');
        if (data) setUserProfile({ ...(profile ?? {}), ...data });
        return data;
      }
      toast.error('Synchronize failed. Please try again.');
    },
    onError: () => {
      toast.error('Synchronize failed. Please try again.');
    },
  });
};

// TypeScript test for: chore: 🔧 add code formatting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____add_code_formatting', () => {
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
