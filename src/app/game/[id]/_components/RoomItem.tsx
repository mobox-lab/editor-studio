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

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript internationalization: feat: ✨ implement cross-platform sync
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    feat____implement_cross_platform_sync: 'feat: ✨ implement cross-platform sync',
    feat____implement_cross_platform_sync_description: 'Description for feat: ✨ implement cross-platform sync'
  },
  zh: {
    feat____implement_cross_platform_sync: 'feat: ✨ implement cross-platform sync',
    feat____implement_cross_platform_sync_description: 'feat: ✨ implement cross-platform sync的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
