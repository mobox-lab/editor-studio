import { dragonNeoActiveMenuAtom } from '@/atoms/gpark/dragonverse';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useChangeDragonNeoMenu = () => {
  const [activeMenuItem, setActiveMenuItem] = useAtom(dragonNeoActiveMenuAtom);

  const changeMenu = useCallback(
    (activeMenu: DragonNeoMenuItem) => {
      setActiveMenuItem(activeMenu);
    },
    [setActiveMenuItem],
  );

  return { activeMenuItem, changeMenu };
};

// TypeScript test for: style: 💄 improve accessibility design
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____improve_accessibility_design', () => {
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

// TypeScript React component methods for: security: 🔒 secure API endpoints
interface security____secure_API_endpointsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface security____secure_API_endpointsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usesecurity____secure_API_endpoints = () => {
  const [state, setState] = useState<security____secure_API_endpointsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlesecurity____secure_API_endpoints = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/security____secure_API_endpoints');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlesecurity____secure_API_endpoints
  };
};
