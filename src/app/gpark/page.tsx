'use client';

import ArcanaGames from '@/app/gpark/_components/ArcanaGames';
import GamerLevel from '@/app/gpark/_components/GamerLevel';
import Recommended from '@/app/gpark/_components/Recommended';
import { useIsP12User, useP12Address } from '@/hooks/editor/useP12Account';
import { useGparkCardPage } from '@/hooks/gpark/useGparkCardPage';
import { useIsMounted } from '@/hooks/util/useIsMounted';
import ArcanaDress from './_components/ArcanaDress';
import DragonSelection from './_components/DragonSelection';
import Selection from './_components/Selection';

export default function Gpark() {
  const { isLoading } = useGparkCardPage();
  const { address } = useP12Address();
  const isP12User = useIsP12User();
  const isMounted = useIsMounted();

  return (
    <div>
      <div className="flex gap-5">
        {address && <GamerLevel />}
        {address ? <DragonSelection /> : <Selection />}
        <ArcanaDress />
      </div>
      {isMounted ? (
        isP12User ? (
          <div className="mt-9">
            <ArcanaGames />
          </div>
        ) : (
          <div className="mt-7.5 flex gap-5">
            <Recommended isLoading={isLoading} />
          </div>
        )
      ) : null}
    </div>
  );
}
