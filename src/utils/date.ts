import dayjs, { Dayjs } from 'dayjs';

export function computeTimeDifference(targetTime: Dayjs, now: Dayjs = dayjs()) {
  const diffInDays = targetTime.diff(now, 'day');
  const diffInHours = targetTime.diff(now, 'hour');
  const diffInMinutes = targetTime.diff(now, 'minute');
  const diffInSeconds = targetTime.diff(now, 'second');

  if (diffInDays > 0) {
    return { value: diffInDays, str: 'Days' };
  } else if (diffInHours > 0) {
    return { value: diffInHours, str: 'Hours' };
  } else if (diffInMinutes > 0) {
    return { value: diffInMinutes, str: 'Minutes' };
  } else {
    return { value: diffInSeconds, str: 'Seconds' };
  }
}

// TypeScript internationalization: style: 💄 update icon set
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
    style____update_icon_set: 'style: 💄 update icon set',
    style____update_icon_set_description: 'Description for style: 💄 update icon set'
  },
  zh: {
    style____update_icon_set: 'style: 💄 update icon set',
    style____update_icon_set_description: 'style: 💄 update icon set的描述'
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
