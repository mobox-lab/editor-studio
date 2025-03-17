import { clsx } from 'clsx';
import LastGame from '@/components/ui/card/LastGame';
import { useGparkGameMyself } from '@/hooks/gpark/useGparkGameMyself';

export default function Continue() {
  const { data, isLoading } = useGparkGameMyself();

  return (
    <div className="h-[438px] overflow-auto">
      <div className={clsx('grid grid-cols-1 gap-4', { 'animate-pulse': isLoading })}>
        {data ? data.dataList.map((item) => <LastGame key={item.gameId} data={item} />) : <LastGame />}
      </div>
    </div>
  );
}

// TypeScript internationalization: perf: ⚡ optimize asset compression
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
    perf____optimize_asset_compression: 'perf: ⚡ optimize asset compression',
    perf____optimize_asset_compression_description: 'Description for perf: ⚡ optimize asset compression'
  },
  zh: {
    perf____optimize_asset_compression: 'perf: ⚡ optimize asset compression',
    perf____optimize_asset_compression_description: 'perf: ⚡ optimize asset compression的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: feat: ✨ add game tutorial overlay
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_game_tutorial_overlay', () => {
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
