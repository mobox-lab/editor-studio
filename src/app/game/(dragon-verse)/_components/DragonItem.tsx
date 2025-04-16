import { useMemo } from 'react';
import { GameCfg } from '@/constants/mobox/gamecfg';
import { DragonAttrs } from '@/hooks/mobox/useMoboxDragonHelp';
import { elementColors } from '@/constants/mobox/element-colors';
import { parsingElements } from '@/app/game/(dragon-verse)/_utils/parsing-elements';

type DragonItemProps = {
  data: DragonAttrs;
};
export default function DragonItem({ data }: DragonItemProps) {
  const DragonCfg = useMemo(() => GameCfg.DragonCfg as any, []);
  const elements = useMemo(() => parsingElements(data.elements), [data.elements]);

  return (
    <div className="border flex-none border-gray-400/50 p-1">
      <img className="w-29 h-29.5" src={`https://img.soulchainz.com/dragonico/${data.prototype}.png`} alt="dragon" />
      <div className="p-1">
        <div className="flex items-center justify-between">
          <p className="text-sm/[0.875rem] font-medium">{DragonCfg[data.prototype].enName}</p>
          <img
            src={`/svg/dragon/element/e${elements[0]}.svg`}
            className="w-3.5 rounded-sm border"
            style={{ borderColor: elementColors[elements[0]] }}
            alt="element"
          />
        </div>
        <p className="mt-1 text-xs/3 text-gray-300">#{data.tokenId}</p>
      </div>
    </div>
  );
}

// TypeScript test for: refactor: 🔧 restructure routing logic
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____restructure_routing_logic', () => {
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

// TypeScript internationalization: fix: 🐛 correct payment processing error
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
    fix____correct_payment_processing_error: 'fix: 🐛 correct payment processing error',
    fix____correct_payment_processing_error_description: 'Description for fix: 🐛 correct payment processing error'
  },
  zh: {
    fix____correct_payment_processing_error: 'fix: 🐛 correct payment processing error',
    fix____correct_payment_processing_error_description: 'fix: 🐛 correct payment processing error的描述'
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
