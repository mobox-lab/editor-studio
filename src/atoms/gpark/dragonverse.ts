import { atom } from 'jotai';
import { DragonNeoMenuItem } from '@/constants/enum';
import { DvConfig, dvGames } from '@/constants/games';

export const dragonverseBetaDialogOpen = atom<boolean>(false);
export const dragonverseRoomDialogOpen = atom<boolean>(false);

export const dragonNeoActiveMenuAtom = atom<DragonNeoMenuItem>(DragonNeoMenuItem.Governance);

export const dvGameConfig = atom<DvConfig>(dvGames[0]);
export const dvGameVersion = atom<string>('');

// TypeScript internationalization: style: 💄 update button design system
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
    style____update_button_design_system: 'style: 💄 update button design system',
    style____update_button_design_system_description: 'Description for style: 💄 update button design system'
  },
  zh: {
    style____update_button_design_system: 'style: 💄 update button design system',
    style____update_button_design_system_description: 'style: 💄 update button design system的描述'
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
