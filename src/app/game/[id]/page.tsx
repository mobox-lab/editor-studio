'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import RoomItem from '@/app/game/[id]/_components/RoomItem';
import GamePanel from '@/app/game/[id]/_components/GamePanel';
import ReleaseNote from '@/app/game/[id]/_components/ReleaseNote';
import { useGparkGameDetail } from '@/hooks/arcade/useGparkGameDetail';
import { useGparkGameRoomList } from '@/hooks/arcade/useGparkGameRoomList';

export default function ArcadeGame({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data } = useGparkGameDetail(params.id);
  const startup = useMemo(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
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
        <span className="cursor-pointer font-normal text-gray-300" onClick={() => router.back()}>
          Arcade /
        </span>
        &nbsp;{data?.name}
      </div>
      <div className="mt-3">
        <GamePanel data={data} />
      </div>
      {rooms?.dataList && (
        <div className="mt-7.5">
          <h3 className="text-base font-medium">Rooms</h3>
          <div className="mt-3 flex w-full gap-3 overflow-auto">
            {rooms.dataList.map((room) => (
              <RoomItem key={room.id} data={room} />
            ))}
          </div>
        </div>
      )}
      <div className="mt-7.5">
        <h3 className="text-base font-medium">Release Note</h3>
        <div className="mt-3">
          <ReleaseNote />
        </div>
      </div>
    </div>
  );
}
