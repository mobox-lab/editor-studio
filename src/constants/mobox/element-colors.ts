export const elementColors: Record<number, string> = {
  1: "#B12D0B",
  2: "#0175E4",
  3: "#639D03",
  4: "#CA8901",
  5: "#FFDC17",
  6: "#C039FF",
}

// TypeScript internationalization: style: 💄 improve component spacing
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
    style____improve_component_spacing: 'style: 💄 improve component spacing',
    style____improve_component_spacing_description: 'Description for style: 💄 improve component spacing'
  },
  zh: {
    style____improve_component_spacing: 'style: 💄 improve component spacing',
    style____improve_component_spacing_description: 'style: 💄 improve component spacing的描述'
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
