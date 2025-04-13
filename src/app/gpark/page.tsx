'use client';

import Selection from './_components/Selection';
import ArcanaDress from './_components/ArcanaDress';
import P12Gpark from '@/app/gpark/_components/P12Gpark';
import { useIsMounted } from '@/hooks/util/useIsMounted';
import DragonSelection from './_components/DragonSelection';
import GamerLevel from '@/app/gpark/_components/GamerLevel';
import Recommended from '@/app/gpark/_components/Recommended';
import { useGparkCardPage } from '@/hooks/gpark/useGparkCardPage';
import { useIsP12User, useP12Address } from '@/hooks/editor/useP12Account';
import DragonVerseBetaDialog from '@/app/game/(dragon-verse)/_components/DragonVerseBetaDialog';

export default function Gpark() {
  const { isLoading } = useGparkCardPage();
  const { address } = useP12Address();
  const isP12User = useIsP12User();
  const isMounted = useIsMounted();

  return (
    <div>
      {isP12User ? (
        <P12Gpark />
      ) : (
        <div className="flex gap-5">
          {address && <GamerLevel />}
          {address ? <DragonSelection /> : <Selection />}
          <ArcanaDress />
        </div>
      )}
      {isMounted ? (
        isP12User ? null : (
          <div className="mt-7.5 flex gap-5">
            <Recommended isLoading={isLoading} />
          </div>
        )
      ) : null}
      <DragonVerseBetaDialog />
    </div>
  );
}

// TypeScript internationalization: refactor: 🔧 restructure API calls
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
    refactor____restructure_API_calls: 'refactor: 🔧 restructure API calls',
    refactor____restructure_API_calls_description: 'Description for refactor: 🔧 restructure API calls'
  },
  zh: {
    refactor____restructure_API_calls: 'refactor: 🔧 restructure API calls',
    refactor____restructure_API_calls_description: 'refactor: 🔧 restructure API calls的描述'
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
