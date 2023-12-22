'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { GparkStartupExtension } from '@/api';
import Right from '@/../public/svg/right.svg?component';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import RoomItem from '@/app/game/[id]/_components/RoomItem';
import GamePanel from '@/app/game/[id]/_components/GamePanel';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';

export default function GparkGame({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data } = useGparkGameDetail(params.id);
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const { handleRunningGame, isLoading } = useRunningGame();
  const { data: rooms } = useGparkGameRoomList({
    maxId: '0',
    gameId: params.id,
    pageSize: 20,
    sortType: 0,
    version: startup.version,
  });

  return (
    <div>
      <div className="text-base font-medium">
        <span
          className="cursor-pointer fill-gray-300 font-normal text-gray-300 hover:fill-white hover:text-white"
          onClick={() => router.back()}
        >
          <Right className="mb-0.5 mr-1 inline w-4 rotate-180" />
          Gpark
        </span>
        <span className="text-gray-300">&nbsp;/&nbsp;</span>
        {data?.name}
      </div>
      <div className="mt-3">
        <GamePanel data={data} isLoading={isLoading} handleRunningGame={() => handleRunningGame({ gameId: params.id })} />
      </div>
      <div className="mt-7.5">
        <h3 className="text-base font-medium">Rooms</h3>
        <div className="mt-3 flex w-full gap-3 overflow-auto">
          {rooms?.dataList ? (
            rooms.dataList.map((room) => <RoomItem key={room.id} data={room} />)
          ) : (
            <div className="flex-center w-full border border-gray-500 bg-gray-550/10 py-12 text-sm text-gray-300">NO ROOM</div>
          )}
        </div>
      </div>
    </div>
  );
}
