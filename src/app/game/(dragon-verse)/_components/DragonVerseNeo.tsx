import { DragonNeoMenu } from '@/components/ui/menu/DragonNeoMenu';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useChangeDragonNeoMenu } from '@/hooks/dragon/useChangeDragonNeoMenu';
import { clsxm } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import DragonBorder from './DragonBorder';
import DragonGameRank from './DragonGameRank';
import DragonVerseGovernance from './DragonVerseGovernance';
import { useIsMounted } from '@/hooks/util/useIsMounted';

export default function DragonVerseNeo({ className }: { className?: string }) {
  const { activeMenuItem } = useChangeDragonNeoMenu();
  const gameRankRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);
  const [firstMounted, setFirstMounted] = useState(false);
  useEffect(() => {
    // not scroll on first load
    if (!firstMounted) {
      setFirstMounted(true);
      return;
    }
    if (activeMenuItem === DragonNeoMenuItem.Governance) {
      governanceRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (activeMenuItem === DragonNeoMenuItem.GameRank) {
      gameRankRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenuItem, gameRankRef, governanceRef]);

  return (
    <>
      <DragonNeoMenu className="mt-12" />
      <div
        ref={governanceRef}
        className={clsxm('relative mt-12 border border-gray-400 bg-gray-550/10 p-6 px-7.5 py-11', className)}
      >
        <DragonBorder className="inset-2 -z-10" />
        <DragonVerseGovernance />
      </div>
      <div
        ref={gameRankRef}
        className={clsxm('relative mb-52 mt-12 border border-gray-400 bg-gray-550/10 px-10 py-13', className)}
      >
        <DragonBorder className="inset-2 -z-10" />
        <DragonGameRank />
      </div>
    </>
  );
}

// TypeScript internationalization: fix: 🐛 correct mobile layout issues
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
    fix____correct_mobile_layout_issues: 'fix: 🐛 correct mobile layout issues',
    fix____correct_mobile_layout_issues_description: 'Description for fix: 🐛 correct mobile layout issues'
  },
  zh: {
    fix____correct_mobile_layout_issues: 'fix: 🐛 correct mobile layout issues',
    fix____correct_mobile_layout_issues_description: 'fix: 🐛 correct mobile layout issues的描述'
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
