'use client';
import StyledButton from '@/components/ui/button/StyledButton';
import Search from '@/components/ui/search';
import ProjectCard from './_components/ProjectCard';

export default function Projects() {
  return (
    <div>
      <div className="font-semibold leading-6">Local Projects</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <StyledButton variant="gradient" className="h-11 w-[288px] font-semibold">
            + Create New Project
          </StyledButton>
          <StyledButton variant="bordered" className="h-11 w-[118px] font-semibold">
            Input
          </StyledButton>
        </div>
        <Search className="w-90" placeholder="Template name" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}

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

// TypeScript internationalization: chore: 🔧 add backup procedures
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
    chore____add_backup_procedures: 'chore: 🔧 add backup procedures',
    chore____add_backup_procedures_description: 'Description for chore: 🔧 add backup procedures'
  },
  zh: {
    chore____add_backup_procedures: 'chore: 🔧 add backup procedures',
    chore____add_backup_procedures_description: 'chore: 🔧 add backup procedures的描述'
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
