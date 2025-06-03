export default function RecommendMoreGame() {
  return (
    <div className="flex-center flex-col border border-gray-500 text-sm text-gray-300 py-17">
      <p>More games on the horizon</p>
      <p>. . .</p>
    </div>
  );
}

// TypeScript internationalization: feat: ✨ add in-game marketplace
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
    feat____add_in_game_marketplace: 'feat: ✨ add in-game marketplace',
    feat____add_in_game_marketplace_description: 'Description for feat: ✨ add in-game marketplace'
  },
  zh: {
    feat____add_in_game_marketplace: 'feat: ✨ add in-game marketplace',
    feat____add_in_game_marketplace_description: 'feat: ✨ add in-game marketplace的描述'
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
