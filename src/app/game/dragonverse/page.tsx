'use client';
import Right from '@/../public/svg/right.svg?component';
import { GparkStartupExtension } from '@/api';
import { launcherConfig } from '@/constants/launcher-config';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import DragonGamePanel from './_components/DragonGamePanel';
import DragonReleaseNote from './_components/DragonReleaseNote';
import DragonRoomItem from './_components/DragonRoomItem';
import DragonVerseNeo from './_components/DragonVerseNeo';
import { useIsP12User } from '@/hooks/editor/useP12Account';

export default function GparkGame() {
  const gameId = launcherConfig.dragonVerseGameId;
  const router = useRouter();
  const { data } = useGparkGameDetail(gameId);
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const { handleRunningGame, isLoading } = useRunningGame();
  const { data: rooms, refetch } = useGparkGameRoomList({
    maxId: '0',
    gameId: gameId,
    pageSize: 20,
    sortType: 0,
    version: startup.version,
  });
  const isP12User = useIsP12User();
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
          <Right className="mb-0.5 mr-1 inline w-4 rotate-180" />
          GPark
        </span>
        <span className="text-gray-300">&nbsp;/&nbsp;</span>
        {data?.name}
      </div>
      <div className="mt-3">
        <DragonGamePanel data={data} isLoading={isLoading} handleRunningGame={() => handleRunningGame({ gameId })} />
      </div>
      <div className="mt-7.5">
        <h3 className="text-base font-medium">Rooms</h3>
        <div className="mt-3 flex w-full gap-3 overflow-auto">
          {rooms?.dataList ? (
            rooms.dataList.map((room) => <DragonRoomItem key={room.id} data={room} refetchRoomList={refetch} />)
          ) : (
            <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">NO ROOM</div>
          )}
        </div>
      </div>
      {/* {isP12User &&  */}
      <DragonVerseNeo />
      {/* } */}
      {/* <div className="mt-7.5">
        <h3 className="text-base font-medium">Release Note</h3>
        <DragonReleaseNote className="mt-3" />
      </div> */}
    </div>
  );
}
