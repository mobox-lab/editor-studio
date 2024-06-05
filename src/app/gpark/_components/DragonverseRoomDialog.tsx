import { useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@/components/ui/dialog';
import RefreshSVG from '@/../public/svg/refresh.svg?component';
import SceneRoomItem from '@/app/gpark/_components/SceneRoomItem';
import { dragonverseRoomDialogOpen, dvGameConfig } from '@/atoms/gpark/dragonverse';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';
import DragonRoomItem from '@/app/game/(dragon-verse)/_components/DragonRoomItem';

type DragonverseRoomDialogProps = { version?: string };

export default function DragonverseRoomDialog({ version }: DragonverseRoomDialogProps) {
  const game = useAtomValue(dvGameConfig);
  const [open, setOpen] = useAtom(dragonverseRoomDialogOpen);
  const params = useMemo(() => ({ maxId: '0', pageSize: 20, sortType: 0, version }), [version]);

  const { data: mainRooms, refetch: mainRefetch } = useGparkGameRoomList({ ...params, gameId: game.code });
  const { data: bwRooms, refetch: bwRefresh } = useGparkGameRoomList({ ...params, sceneId: game.scenes.battleWorld });
  const { data: psRooms, refetch: psRefresh } = useGparkGameRoomList({ ...params, sceneId: game.scenes.petSimulator });

  const mainRoomList = useMemo(() => mainRooms?.dataList ?? [], [mainRooms?.dataList]);
  const bwRoomList = useMemo(() => bwRooms?.dataList ?? [], [bwRooms?.dataList]);
  const psRoomList = useMemo(() => psRooms?.dataList ?? [], [psRooms?.dataList]);

  const onRefreshClick = () => {
    mainRefetch().then();
    bwRefresh().then();
    psRefresh().then();
    toast.success('Room refresh successful');
  };

  return (
    <Dialog
      title="Room List"
      open={open}
      onOpenChange={(open) => setOpen(open)}
      render={() => (
        <div className="px-6 py-7.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm/4 font-semibold">
              <img src="/img/gpark/dv-icon.webp" alt="dv" className="w-7" />
              Dragonverse Neo
            </div>
            <div className="flex-center h-7 w-7 cursor-pointer bg-white/10" onClick={onRefreshClick}>
              <RefreshSVG className="fill-white" />
            </div>
          </div>
          <div className="mt-3 flex w-[708px] gap-3 overflow-auto pb-2">
            {mainRoomList.length ? (
              mainRoomList.map((room) => (
                <DragonRoomItem key={room.roomId} data={room} className="w-[168px]" refetchRoomList={mainRefetch} />
              ))
            ) : (
              <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">
                NO ROOM
              </div>
            )}
          </div>
          <div className="mt-5.5 grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-sm/4 font-semibold">
                <img src="/img/gpark/bw-icon.webp" alt="bw" className="w-7" />
                Infinity Ramble
              </div>
              <div className="mt-3 grid gap-3">
                {bwRoomList.length ? (
                  bwRoomList.map((room) => <SceneRoomItem key={room.roomId} data={room} />)
                ) : (
                  <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">
                    NO ROOM
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm/4 font-semibold">
                <img src="/img/gpark/ps-icon.webp" alt="ps" className="w-7" />
                Dream Pets
              </div>
              <div className="mt-3 grid gap-3">
                {psRoomList.length ? (
                  psRoomList.map((room) => <SceneRoomItem key={room.roomId} data={room} />)
                ) : (
                  <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">
                    NO ROOM
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
