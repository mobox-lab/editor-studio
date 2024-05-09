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
import Background from './_components/Background';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import { launcherConfig } from '@/constants/launcher-config';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { useGparkGameRoomList, useGparkGameRoomStatus } from '@/hooks/gpark/useGparkGameRoomList';
import { GparkGameRoomItem, GparkStartupExtension } from '@/api';
import { useEffect, useMemo, useState } from 'react';
import { openExternalLink, sendEvent } from '@/utils';
import { RoomStatus } from '@/constants/enum';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Popover from '@/components/ui/popover';
import clsx from 'clsx';
import { GAME_ACTIVE_BANNERS } from '@/constants';
import Slider from 'react-slick';

const settings = {
  className: 'slider variable-width',
  variableWidth: true,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};

export default function Gpark() {
  const { isLoading } = useGparkCardPage();
  const { address } = useP12Address();

  const isP12User = useIsP12User();
  const isMounted = useIsMounted();
  const gameId = launcherConfig.dragonVerseGameId;
  const { data } = useGparkGameDetail(gameId);
  const { handleRunningGame, isLoading: runningLoading } = useRunningGame();
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const { data: rooms, refetch } = useGparkGameRoomList({
    maxId: '0',
    gameId: gameId,
    pageSize: 20,
    sortType: 0,
    version: startup.version,
  });
  const [room, setRoom] = useState<GparkGameRoomItem | undefined>(undefined);
  const { mutateAsync } = useGparkGameRoomStatus();
  const [joinIsLoading, setJoinIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const version = searchParams.get('version');

  const handleJoinRoom = async () => {
    if (isLoading || !room) return;
    setJoinIsLoading(true);
    try {
      const { data: res } = await mutateAsync(room.roomId);
      sendEvent('gp_room_status', '房间状态', {
        game_id: room.gameId,
        room_id: room.roomId,
        status: RoomStatus.CanJoin,
      });
      if (res.roomStatus === RoomStatus.CanJoin) {
        await handleRunningGame({ gameId: room.gameId, roomId: room.roomId, version });
        setTimeout(() => refetch?.(), 10_000);
        return;
      }
      if (res.roomStatus === RoomStatus.Full) {
        toast.error('Room is full');
        return;
      }
      if (res.roomStatus === RoomStatus.Closed) {
        toast.error('Room is closed');
        return;
      }
    } catch (e) {
      toast.error('Join room failed');
    } finally {
      setJoinIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <Background />
      <div className="relative mt-[182px] flex items-center justify-between">
        <div className="h-[262px] w-[464px]">
          <Slider {...settings}>
            {GAME_ACTIVE_BANNERS.map((banner, index) => (
              <img
                key={banner.title}
                src={banner.img}
                alt={banner.title}
                className="h-[262px] w-[468px] cursor-pointer"
                onClick={() => openExternalLink(banner.url)}
              />
            ))}
          </Slider>
        </div>
        <div className="flex flex-col items-end">
          <ArcanaDress />
          <div className="gradient-red mt-8 flex h-[113px] w-[300px] flex-col items-center ">
            {runningLoading || joinIsLoading ? (
              <div className="flex-center text-2xl/14 mt-2 h-14 font-semibold">Loading...</div>
            ) : (
              <img
                src="/img/gpark/play-now.webp"
                alt="play now"
                className="mt-2 w-[148px]"
                onClick={() => {
                  if (room) {
                    handleJoinRoom;
                  } else {
                    handleRunningGame?.({ gameId });
                  }
                }}
              />
            )}

            <div className="w-full px-3">
              <div className="h-[1px] w-full bg-[#E44B29]"></div>
            </div>
            <Popover
              placement="top"
              render={() => (
                <div className="max-h-[140px] w-[300px] overflow-scroll p-2">
                  {rooms?.dataList ? (
                    rooms.dataList.map((room) => {
                      return (
                        <div
                          key={room.id}
                          className={clsx('h-9 w-full px-2.5 text-sm/9 hover:bg-white/[0.12]', {
                            'cursor-not-allowed': room.number === room.limitNumber,
                          })}
                          onClick={() => {
                            if (room.number === room.limitNumber) {
                              return;
                            }
                            setRoom(room);
                          }}
                        >
                          Room {room.roomId} ({room.number === room.limitNumber ? 'Full' : `${room.number}/${room.limitNumber}`}
                          )
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full text-center text-sm text-gray-300">NO ROOM</div>
                  )}
                </div>
              )}
            >
              <div className="flex-center relative h-12 w-full text-sm/5 hover:bg-white/[0.12]">
                {room ? `Room ${room.roomId}` : 'Select to Join Room'}
              </div>
            </Popover>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-5">
        {address && <GamerLevel />}
        {address ? <DragonSelection /> : <Selection />}
        <ArcanaDress />
      </div> */}
      {/*   <div className="mt-9">
          <ArcanaGames />
        </div> 
        */}
      {isMounted ? (
        isP12User ? null : (
          <div className="mt-7.5 flex gap-5">
            <Recommended isLoading={isLoading} />
          </div>
        )
      ) : null}
    </div>
  );
}
