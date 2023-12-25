import Image from 'next/image';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { GparkGameRoomItem } from '@/api';
import { RoomStatus } from '@/constants/enum';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import { useGparkGameRoomStatus } from '@/hooks/gpark/useGparkGameRoomList';

export default function RoomItem({ data }: { data: GparkGameRoomItem }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync } = useGparkGameRoomStatus();
  const member = useMemo(() => data.members?.[0] ?? {}, [data.members]);
  const { handleRunningGame } = useRunningGame();

  const handleJoinRoom = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data: res } = await mutateAsync(data.roomId);
      if (res.roomStatus === RoomStatus.CanJoin) {
        await handleRunningGame({ gameId: data.gameId, roomId: data.roomId });
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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-none border border-gray-400 bg-gray-550/10 p-2">
      <div className="flex items-center gap-0.5">
        <Image src="/svg/portrait.svg" width={12} height={12} alt="portrait" />
        <p className="text-xs font-medium">
          {data.number}/{data.limitNumber}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="relative h-7 w-7 overflow-hidden rounded-full">
          <Image fill style={{ objectFit: 'cover' }} src={member.avatar} alt="avatar" />
        </div>
        <div className="flex text-sm font-semibold">Room {data.roomId}</div>
      </div>
      {data.status ? (
        <div
          onClick={handleJoinRoom}
          className="mt-2 cursor-pointer rounded-sm bg-blue/20 py-2.5 text-center text-base/5 font-semibold text-blue hover:bg-blue/30"
        >
          {isLoading ? <LoadingSvg className="mx-auto animate-spin fill-blue" /> : 'JOIN'}
        </div>
      ) : (
        <div className="mt-2 cursor-not-allowed rounded-sm bg-gray-300/10 py-2.5 text-center text-base/5 font-semibold text-gray-300">
          FULL
        </div>
      )}
    </div>
  );
}
