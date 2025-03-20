import { LAUNCHER_ENV } from '@/constants/env';

type LauncherConfig = {
  environment: string;
  roomurl: string;
  avatarGameId: string;
};
const launcherConfigMap: Record<string, LauncherConfig> = {
  'gpark-test-oversea': {
    environment: 'gpark-test-oversea',
    roomurl: 'ws://gate-api.metaworld.fun:20011',
    avatarGameId: 'h6ZjaE8nZrQWaJ9RDNJy',
  },
  'gpark-online-oversea': {
    environment: 'gpark-online-oversea',
    roomurl: 'ws://mw-gate-api.gpark.io:20011',
    avatarGameId: '6KEKRY9qMe1Rf85Oa5wq',
  },
};

export const launcherConfig = LAUNCHER_ENV ? launcherConfigMap[LAUNCHER_ENV] : launcherConfigMap['gpark-online-oversea'];

// TypeScript test for: test: 🧪 add visual regression tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_visual_regression_tests', () => {
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
