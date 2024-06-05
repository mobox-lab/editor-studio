'use client';

import { useMemo, useState } from 'react';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { RoomStatus } from '@/constants/enum';
import { useSearchParams } from 'next/navigation';
import { GAME_ACTIVE_BANNERS } from '@/constants';
import { openExternalLink, sendEvent } from '@/utils';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import Background from '@/app/gpark/_components/Background';
import { launcherConfig } from '@/constants/launcher-config';
import ArcanaDress from '@/app/gpark/_components/ArcanaDress';
import { GparkGameRoomItem, GparkStartupExtension } from '@/api';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { useGparkGameRoomList, useGparkGameRoomStatus } from '@/hooks/gpark/useGparkGameRoomList';
import { dvGameConfig } from '@/atoms/gpark/dragonverse';
import { dvGames } from '@/constants/games';

const settings = {
  className: 'slider variable-width',
  variableWidth: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};

export default function P12Gpark() {
  const gameId = dvGames[0].code;
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
    if (!room) return;
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
    <div>
      <Background />
      <div className="relative mt-[182px] flex items-center justify-between">
        <div className="h-[262px] w-[464px] overflow-visible">
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
          <div className="mt-8 flex h-[113px] w-[300px] cursor-not-allowed flex-col items-center !bg-[#2E2E2E]">
            {runningLoading || joinIsLoading ? (
              <div className="flex-center text-2xl/14 mt-2 h-14 font-semibold">Loading...</div>
            ) : room ? (
              <img src="/img/gpark/join-room.webp" alt="join room" className="mt-2 w-[173px]" />
            ) : (
              <img src="/img/gpark/play-now.webp" alt="play now" className="mt-2 w-[148px] opacity-20" />
            )}

            <div className="w-full px-3">
              <div className="h-[1px] w-full bg-white/20"></div>
            </div>
            <div className="flex-center relative h-12 w-full text-sm/5 text-white/20">
              {room ? `Room ${room.roomId}` : 'Select to Join Room'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
