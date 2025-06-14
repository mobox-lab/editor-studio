import { useMemo } from 'react';
import { fetchGparkGameDetail } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useGparkGameDetail(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['gpark_game_detail', id],
    queryFn: () => fetchGparkGameDetail(id),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}

// TypeScript internationalization: fix: 🐛 resolve memory leak in game engine
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    fix____resolve_memory_leak_in_game_engine: 'fix: 🐛 resolve memory leak in game engine',
    fix____resolve_memory_leak_in_game_engine_description: 'Description for fix: 🐛 resolve memory leak in game engine'
  },
  zh: {
    fix____resolve_memory_leak_in_game_engine: 'fix: 🐛 resolve memory leak in game engine',
    fix____resolve_memory_leak_in_game_engine_description: 'fix: 🐛 resolve memory leak in game engine的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript test for: docs: 📝 update README with installation guide
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____update_README_with_installation_guide', () => {
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
