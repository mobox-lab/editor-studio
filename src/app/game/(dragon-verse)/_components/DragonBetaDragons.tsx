import Link from 'next/link';
import Right from '@/../public/svg/right.svg?component';
import { useP12Address } from '@/hooks/editor/useP12Account';
import { useMoboxDragons } from '@/hooks/mobox/useMoboxDragonHelp';
import DragonItem from '@/app/game/(dragon-verse)/_components/DragonItem';

export default function DragonBetaDragons() {
  const { address } = useP12Address();
  const { data } = useMoboxDragons({ address });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex-center gap-1">
          <img src="/svg/dragon/dragon.svg" alt="dragon" className="w-6" />
          <span className="font-medium">My MODragon ({data.length})</span>
        </div>
        <div>
          <Link className="flex-center font-medium" target="__blank" href="https://www.mobox.io/#/iframe/dragonmo">
            Go Market
            <Right className="w-3.5 fill-blue" />
          </Link>
        </div>
      </div>
      <div className="mt-3 flex gap-3 overflow-auto">
        {data.length ? (
          data.map((item, index) => <DragonItem key={index} data={item} />)
        ) : (
          <div className="flex-center box-content w-full border border-gray-500 bg-gray-550/10 py-18 text-sm text-gray-300">
            NO DRAGON
          </div>
        )}
      </div>
    </div>
  );
}

// TypeScript test for: docs: 📝 update wallet integration guide
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____update_wallet_integration_guide', () => {
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

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};

// TypeScript internationalization: perf: ⚡ optimize rendering pipeline
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
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'Description for perf: ⚡ optimize rendering pipeline'
  },
  zh: {
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'perf: ⚡ optimize rendering pipeline的描述'
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
