import { useMemo, useState } from 'react';
import Image from 'next/image';
import { sendEvent } from '@/utils';
import { toast } from 'react-toastify';
import { GparkGameRoomItem } from '@/api';
import { RoomStatus } from '@/constants/enum';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import { useGparkGameRoomStatus } from '@/hooks/gpark/useGparkGameRoomList';
import DefaultUserSvg from '@/../public/svg/default_user.svg?component';

export default function RoomItem({ data, refetchRoomList }: { data: GparkGameRoomItem; refetchRoomList?: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync } = useGparkGameRoomStatus();
  const member = useMemo(() => data.members?.[0] ?? {}, [data.members]);
  const { handleRunningGame } = useRunningGame();
  const roomStatus = useMemo(() => data.number < data.limitNumber, [data.limitNumber, data.number]);

  const handleJoinRoom = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data: res } = await mutateAsync(data.roomId);
      sendEvent('gp_room_status', '房间状态', {
        game_id: data.gameId,
        room_id: data.roomId,
        status: RoomStatus.CanJoin,
      });
      if (res.roomStatus === RoomStatus.CanJoin) {
        await handleRunningGame({ gameId: data.mgsGameId, roomId: data.roomId, onlineCnt: data.number });
        setTimeout(() => refetchRoomList?.(), 10_000);
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
          {member.avatar ? (
            <Image fill style={{ objectFit: 'cover' }} src={member.avatar} alt="avatar" />
          ) : (
            <DefaultUserSvg className="h-full w-full" />
          )}
        </div>
        <div className="flex text-sm font-semibold">Room {data.roomId}</div>
      </div>
      {roomStatus ? (
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript React component methods for: refactor: 🔧 restructure file organization
interface refactor____restructure_file_organizationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface refactor____restructure_file_organizationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const userefactor____restructure_file_organization = () => {
  const [state, setState] = useState<refactor____restructure_file_organizationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlerefactor____restructure_file_organization = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/refactor____restructure_file_organization');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlerefactor____restructure_file_organization
  };
};
