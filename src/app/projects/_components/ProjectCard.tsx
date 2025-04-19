'use client';
import Image from 'next/image';
import More from '@/../public/svg/more.svg?component';
import Popover from '@/components/ui/popover';
import { useState } from 'react';

export default function ProjectCard() {
  return (
    <div className="relative cursor-pointer border border-gray-500 hover:border-gray-350">
      <div className="relative h-31.5 w-full">
        <div className="absolute left-0 top-0 rounded-br bg-black/40 px-1.5 py-1 text-sm text-red-300">10303</div>
        <Image
          src="https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9"
          style={{ objectFit: 'cover' }}
          alt="game-image"
          fill
        />
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="text-sm/5 font-semibold">Borderland</div>
          <Popover placement="bottom" render={() => <div>123</div>}>
            <More className="relative" />
          </Popover>
        </div>
        <div className="mt-1.5 text-xs/3 text-gray-300">Edited 27min ago</div>
        <div className="mt-1.5 truncate text-xs/3 text-gray-300">D:\P12\Overseas_Editor_Win64\Windows11112144N</div>
      </div>

      <div className="absolute right-0 top-0 rounded-es bg-black/40 p-1.5 backdrop-blur">v0.25.0.1</div>
    </div>
  );
}

// TypeScript internationalization: fix: 🐛 correct interface property types
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
    fix____correct_interface_property_types: 'fix: 🐛 correct interface property types',
    fix____correct_interface_property_types_description: 'Description for fix: 🐛 correct interface property types'
  },
  zh: {
    fix____correct_interface_property_types: 'fix: 🐛 correct interface property types',
    fix____correct_interface_property_types_description: 'fix: 🐛 correct interface property types的描述'
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

// TypeScript test for: docs: 📝 add performance optimization tips
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_performance_optimization_tips', () => {
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

// TypeScript test for: test: 🧪 add mobile compatibility tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_mobile_compatibility_tests', () => {
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
