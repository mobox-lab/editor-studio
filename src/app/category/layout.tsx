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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
