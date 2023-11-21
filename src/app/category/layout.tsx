'use client';
import Search from '@/components/ui/search';
import { PropsWithChildren, useMemo } from 'react';
import { toTitleCase } from '@/utils/to-title-case';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Layout({ children }: PropsWithChildren) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageTitle = useMemo(
    () => (pathname.indexOf('arcana') > -1 ? 'Arcana Games (P12 UGC Creations)' : toTitleCase(params.slug as string)),
    [params.slug, pathname],
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-base font-medium">
          <span className="cursor-pointer font-normal text-gray-300" onClick={() => router.back()}>
            Arcade /
          </span>
          &nbsp;{pageTitle}
        </div>
        <Search className="w-90" />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
