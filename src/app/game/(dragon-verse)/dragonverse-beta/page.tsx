'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import Back from '@/../public/svg/back.svg?component';
import { useIsP12User } from '@/hooks/editor/useP12Account';
import { launcherConfig } from '@/constants/launcher-config';
import { dragonverseBetaType } from '@/atoms/gpark/dragonverse';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import DragonVerseNeo from '@/app/game/(dragon-verse)/_components/DragonVerseNeo';
import DragonBetaPanel from '@/app/game/(dragon-verse)/_components/DragonBetaPanel';

export default function DragonverseBeta() {
  const router = useRouter();
  const isP12User = useIsP12User();
  const type = useAtomValue(dragonverseBetaType);
  const gameId = type === 'release' ? launcherConfig.TestDragonVerseGameIdRelease : launcherConfig.TestDragonVerseGameId;
  const { data } = useGparkGameDetail(gameId);

  return (
    <div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[986px] w-full">
        <div className="fixed inset-0 -z-10 bg-black"></div>
        <img className="absolute -z-10 h-full w-full object-cover" src="/img/gpark/dragon-BG.webp" alt="" />
      </div>
      <div className="text-base font-medium">
        <span
          className="cursor-pointer fill-gray-300 font-normal text-gray-300 hover:fill-white hover:text-white"
          onClick={() => router.back()}
        >
          <Back className="mb-0.5 mr-2 inline w-9 hover:fill-white/20" />
          GPark
        </span>
        <span className="text-gray-300">&nbsp;/&nbsp;</span>
        {data?.name}
      </div>
      <div className="mt-4">
        <DragonBetaPanel data={data} />
      </div>
      {isP12User && <DragonVerseNeo />}
    </div>
  );
}
