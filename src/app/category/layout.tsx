'use client';
import Search from '@/components/ui/search';
import { PropsWithChildren, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { toTitleCase } from '@/utils/to-title-case';

export default function Layout({ children }: PropsWithChildren) {
  const params = useParams();
  const pathname = usePathname();

  const pageTitle = useMemo(
    () => (pathname.indexOf('arcana') > -1 ? 'Arcana Games (P12 UGC Creations)' : toTitleCase(params.slug as string)),
    [params.slug, pathname],
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-base font-medium">
          <span className="font-normal text-gray-300">Arcade /</span> {pageTitle}
        </div>
        <Search className="w-90" />
      </div>
      {children}
    </div>
  );
}
