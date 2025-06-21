'use client';
import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GparkStartupExtension } from '@/api';
import Back from '@/../public/svg/back.svg?component';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import RoomItem from '@/app/game/[id]/_components/RoomItem';
import GamePanel from '@/app/game/[id]/_components/GamePanel';
import { useGparkGameDetail } from '@/hooks/gpark/useGparkGameDetail';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';

export default function GparkGame({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data } = useGparkGameDetail(params.id);
  const query = useSearchParams();
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const { handleRunningGame, isLoading } = useRunningGame();
  const { data: rooms, refetch } = useGparkGameRoomList({
    maxId: '0',
    gameId: params.id,
    pageSize: 20,
    sortType: 0,
    version: startup.version,
  });

  const onBack = useCallback(() => {
    // if (query.get('back') === 'gpark') {
    //   router.replace('/');
    // } else {
    //   router.replace('/');
    // }
    router.replace('/gpark');
  }, [router]);

  return (
    <div className='px-[120px]'>
      <div className="text-base font-medium">
        <span
          className="cursor-pointer fill-gray-300 font-normal text-gray-300 hover:fill-white hover:text-white"
          onClick={onBack}
        >
          <Back className="mb-0.5 mr-2 inline w-9 hover:fill-white/20" />
          GPark
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
          {rooms?.dataList.length ? (
            rooms.dataList.map((room) => <RoomItem key={room.roomId} data={room} refetchRoomList={refetch} />)
          ) : (
            <div className="flex-center w-full border border-gray-500 bg-gray-550/10 py-12 text-sm text-gray-300">NO ROOM</div>
          )}
        </div>
      </div>
    </div>
  );
}

// TypeScript internationalization: fix: 🐛 correct type definitions for API responses
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
    fix____correct_type_definitions_for_API_responses: 'fix: 🐛 correct type definitions for API responses',
    fix____correct_type_definitions_for_API_responses_description: 'Description for fix: 🐛 correct type definitions for API responses'
  },
  zh: {
    fix____correct_type_definitions_for_API_responses: 'fix: 🐛 correct type definitions for API responses',
    fix____correct_type_definitions_for_API_responses_description: 'fix: 🐛 correct type definitions for API responses的描述'
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

// TypeScript utility function: security: 🔒 secure API endpoints
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____secure_API_endpoints: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
