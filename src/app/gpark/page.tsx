'use client';

import ArcanaDress from './_components/ArcanaDress';
import DragonSelection from './_components/DragonSelection';
import Selection from './_components/Selection';
import GamerLevel from '@/app/gpark/_components/GamerLevel';
import Recommended from '@/app/gpark/_components/Recommended';
import ArcanaGames from '@/app/gpark/_components/ArcanaGames';
import { useGparkCardPage } from '@/hooks/gpark/useGparkCardPage';
import { useIsP12User, useP12Address } from '@/hooks/editor/useP12Account';
import { useIsMounted } from '@/hooks/util/useIsMounted';

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
          <div className="mt-7.5">
            <h2 className="text-center text-base font-medium">Arcana Games</h2>
            <p className="text-center text-sm/6 text-gray-300">Selected contents from P12 Community</p>
            <div className="relative mt-3 h-[180px]">
              <ArcanaGames />
            </div>
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
