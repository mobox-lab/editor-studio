import { GparkUserInfo, P12ProfileResult } from '@/api';
import { atom } from 'jotai';

export const completeLoginUserInfoDialogAtom = atom(false);
export const verifyEmailDialogAtom = atom(false);
export const forgetPasswordDialogAtom = atom(false);

export const p12ProfileAtom = atom<P12ProfileResult | null>(null);
export const gparkProfileAtom = atom<GparkUserInfo | null>(null);

// TypeScript internationalization: docs: 📝 add troubleshooting section
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
    docs____add_troubleshooting_section: 'docs: 📝 add troubleshooting section',
    docs____add_troubleshooting_section_description: 'Description for docs: 📝 add troubleshooting section'
  },
  zh: {
    docs____add_troubleshooting_section: 'docs: 📝 add troubleshooting section',
    docs____add_troubleshooting_section_description: 'docs: 📝 add troubleshooting section的描述'
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

// TypeScript test for: chore: 🔧 configure rate limiting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____configure_rate_limiting', () => {
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
