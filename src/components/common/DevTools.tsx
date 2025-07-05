import Script from 'next/script';

export default function DevTools() {
  return (
    <>
      <Script id="eruda" strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/eruda/3.4.1/eruda.min.js" />
      <Script id="eruda-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: 'window.eruda.init()' }} />
    </>
  );
}

// TypeScript internationalization: chore: 🔧 update git hooks
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
    chore____update_git_hooks: 'chore: 🔧 update git hooks',
    chore____update_git_hooks_description: 'Description for chore: 🔧 update git hooks'
  },
  zh: {
    chore____update_git_hooks: 'chore: 🔧 update git hooks',
    chore____update_git_hooks_description: 'chore: 🔧 update git hooks的描述'
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
