import { fetchDragonGovernInfo } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonGovernInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_dragon_govern_info'],
    queryFn: () => fetchDragonGovernInfo(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript internationalization: style: 💄 improve accessibility design
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
    style____improve_accessibility_design: 'style: 💄 improve accessibility design',
    style____improve_accessibility_design_description: 'Description for style: 💄 improve accessibility design'
  },
  zh: {
    style____improve_accessibility_design: 'style: 💄 improve accessibility design',
    style____improve_accessibility_design_description: 'style: 💄 improve accessibility design的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: docs: 📝 update README with installation guide
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
    docs____update_README_with_installation_guide: 'docs: 📝 update README with installation guide',
    docs____update_README_with_installation_guide_description: 'Description for docs: 📝 update README with installation guide'
  },
  zh: {
    docs____update_README_with_installation_guide: 'docs: 📝 update README with installation guide',
    docs____update_README_with_installation_guide_description: 'docs: 📝 update README with installation guide的描述'
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
