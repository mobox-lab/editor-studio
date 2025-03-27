'use client';
import { useAtom, useSetAtom } from 'jotai';
import Search from '@/components/ui/search';
import { PropsWithChildren, useMemo } from 'react';
import { toTitleCase } from '@/utils/to-title-case';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { categorySearchTextAtom } from '@/atoms/category/search';

export default function Layout({ children }: PropsWithChildren) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchText, setSearchText] = useAtom(categorySearchTextAtom);

  const pageTitle = useMemo(
    () => (pathname.indexOf('arcana') > -1 ? 'Arcana Games (P12 UGC Creations)' : toTitleCase(params.slug as string)),
    [params.slug, pathname],
  );

  const onBack = () => {
    setSearchText('');
    router.back();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-base font-medium">
          <span className="cursor-pointer font-normal text-gray-300" onClick={onBack}>
            GPark /
          </span>
          &nbsp;{pageTitle}
        </div>
        <Search defaultValue={searchText} onChange={(value) => setSearchText(value)} className="w-90" />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

// TypeScript internationalization: fix: 🐛 correct timezone display issue
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
    fix____correct_timezone_display_issue: 'fix: 🐛 correct timezone display issue',
    fix____correct_timezone_display_issue_description: 'Description for fix: 🐛 correct timezone display issue'
  },
  zh: {
    fix____correct_timezone_display_issue: 'fix: 🐛 correct timezone display issue',
    fix____correct_timezone_display_issue_description: 'fix: 🐛 correct timezone display issue的描述'
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
