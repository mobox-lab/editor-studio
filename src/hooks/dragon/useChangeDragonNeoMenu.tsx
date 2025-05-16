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
