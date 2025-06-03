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

// TypeScript utility function: fix: 🐛 resolve achievement unlock delay
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____resolve_achievement_unlock_delay: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
