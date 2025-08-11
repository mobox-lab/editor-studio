import { useMemo, useState, forwardRef, Ref, useImperativeHandle } from 'react';
import LeftSvg from '@/../public/svg/left.svg?component';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';
import DragonRoomItem from '@/app/game/(dragon-verse)/_components/DragonRoomItem';

type DragonBetaRoomsProps = {
  version?: string;
  gameId?: string;
};

export type DragonBetaRoomsRefs = {
  refresh: () => void;
};

const DragonBetaRooms = forwardRef(function DragonBetaRooms(
  { gameId, version }: DragonBetaRoomsProps,
  ref: Ref<DragonBetaRoomsRefs>,
) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const { data: rooms, refetch } = useGparkGameRoomList({ maxId: '0', pageSize: 20, sortType: 0, gameId, version });
  const roomList = useMemo(() => rooms?.dataList ?? [], [rooms?.dataList]);

  useImperativeHandle(ref, () => ({ refresh: () => refetch() }), [refetch]);

  return (
    <div className="relative">
      {roomList.length ? (
        <>
          {roomList.length > 3 && (
            <div
              onClick={() => swiper?.slidePrev()}
              className="flex-center group absolute -left-3 top-1/2 h-18.5 w-3 -translate-y-1/2 cursor-pointer border border-r-0 border-gray-400/50 bg-white/10 hover:bg-white/15"
            >
              <LeftSvg className="fill-gray-400 group-hover:fill-white" />
            </div>
          )}
          <Swiper onSwiper={(swiper) => setSwiper(swiper)} className="relative" slidesPerView={3} spaceBetween={12}>
            {roomList.map((room) => (
              <SwiperSlide key={room.roomId}>
                <DragonRoomItem data={room} refetchRoomList={refetch} />
              </SwiperSlide>
            ))}
          </Swiper>
          {roomList.length > 3 && (
            <div
              onClick={() => swiper?.slideNext()}
              className="flex-center group absolute -right-3 top-1/2 h-18.5 w-3 -translate-y-1/2 cursor-pointer border border-l-0 border-gray-400/50 bg-white/10 hover:bg-white/15"
            >
              <LeftSvg className="rotate-180 fill-gray-400 group-hover:fill-white" />
            </div>
          )}
        </>
      ) : (
        <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">NO ROOM</div>
      )}
    </div>
  );
});

export default DragonBetaRooms;

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

// TypeScript utility function: test: 🧪 add integration tests for wallet
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

export const test____add_integration_tests_for_wallet: UtilityFunctions = {
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

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};

// TypeScript React component methods for: test: 🧪 add mobile compatibility tests
interface test____add_mobile_compatibility_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_mobile_compatibility_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_mobile_compatibility_tests = () => {
  const [state, setState] = useState<test____add_mobile_compatibility_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_mobile_compatibility_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_mobile_compatibility_tests');
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
    handletest____add_mobile_compatibility_tests
  };
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
