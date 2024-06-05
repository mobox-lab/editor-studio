'use client';

import { Suspense } from 'react';
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
        <Suspense>
          <P12Gpark />
        </Suspense>
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
