import { GparkGameRoomItem } from '@/api';
import { useCopyToClipboard } from 'react-use';
import RoomSVG from '@/../public/svg/room.svg?component';
import CopySVG from '@/../public/svg/copy.svg?component';
import { toast } from 'react-toastify';

export default function SceneRoomItem({ data }: { data: GparkGameRoomItem }) {
  const [, copyToClipboard] = useCopyToClipboard();

  const onCopyClick = () => {
    copyToClipboard(data.roomId);
    toast.success(`Copied Room: ${data.roomId}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-center gap-1 text-sm/6 font-medium">
        <RoomSVG className="w-3.5" />
        Room {data.roomId} ({data.number}/{data.limitNumber})
      </div>
      <CopySVG className="w-6 cursor-pointer" onClick={onCopyClick} />
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: fix: 🐛 resolve data synchronization bug
interface fix____resolve_data_synchronization_bugProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_data_synchronization_bugState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_data_synchronization_bug = () => {
  const [state, setState] = useState<fix____resolve_data_synchronization_bugState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_data_synchronization_bug = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_data_synchronization_bug');
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
    handlefix____resolve_data_synchronization_bug
  };
};
