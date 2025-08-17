export const getNumberFormatter = (options?: object) => new Intl.NumberFormat('en', options || { notation: 'standard' });

export const compactNumberFormatter = getNumberFormatter({
  notation: 'compact',
  compactDisplay: 'short',
});

export const defaultNumberFormatter = getNumberFormatter(
  // format with two decimal places
  { maximumFractionDigits: 2 },
);
export const formatNumber = (number: number, formatter?: Intl.NumberFormat) => {
  formatter = formatter || defaultNumberFormatter;

  return formatter.format(number);
};

export const formatCompactNumber = (number: number) => formatNumber(number, compactNumberFormatter);

export function toSignificant(num: number | string, digits: number = 6) {
  const n = typeof num === 'string' ? Number(num) : num;
  const formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: digits });

  return formatter.format(n);
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: security: 🔒 implement access controls
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
    security____implement_access_controls: 'security: 🔒 implement access controls',
    security____implement_access_controls_description: 'Description for security: 🔒 implement access controls'
  },
  zh: {
    security____implement_access_controls: 'security: 🔒 implement access controls',
    security____implement_access_controls_description: 'security: 🔒 implement access controls的描述'
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
