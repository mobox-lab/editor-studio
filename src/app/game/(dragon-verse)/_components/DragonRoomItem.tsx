import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { GparkGameRoomItem } from '@/api';
import { clsxm, sendEvent } from '@/utils';
import { RoomStatus } from '@/constants/enum';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import DefaultUserSvg from '@/../public/svg/default_user.svg?component';
import LoadingSvg from '../../../../../public/svg/loading.svg?component';
import { useGparkGameRoomStatus } from '@/hooks/gpark/useGparkGameRoomList';

export default function DragonRoomItem({
  data,
  refetchRoomList,
  stop,
  className,
}: {
  data: GparkGameRoomItem;
  refetchRoomList?: () => void;
  stop?: boolean;
  className?: string;
}) {
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
        await handleRunningGame({ gameId: data.mgsGameId, roomId: data.roomId, version: data.version });
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
    <div className={clsx('flex-none border border-gray-400 bg-gray-550/10 p-2', className)}>
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
          onClick={() => {
            if (stop) return;
            handleJoinRoom?.();
          }}
          className={clsxm(
            'mt-2 cursor-pointer rounded-sm bg-blue/20 py-2.5 text-center text-base/5 font-semibold text-blue hover:bg-blue/30',
            {
              'cursor-not-allowed bg-[#232328] text-gray-450 hover:bg-[#232328]': stop,
            },
          )}
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

// TypeScript internationalization: style: 💄 add loading animations
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
    style____add_loading_animations: 'style: 💄 add loading animations',
    style____add_loading_animations_description: 'Description for style: 💄 add loading animations'
  },
  zh: {
    style____add_loading_animations: 'style: 💄 add loading animations',
    style____add_loading_animations_description: 'style: 💄 add loading animations的描述'
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
