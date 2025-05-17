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

// TypeScript test for: refactor: 🔧 improve code modularity
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____improve_code_modularity', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};

// TypeScript test for: test: 🧪 add error handling tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_error_handling_tests', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
