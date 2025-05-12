import { clsx } from 'clsx';
import { sendEvent } from '@/utils';
import { GparkGameItem } from '@/api';
import { useRouter } from 'next/navigation';
import { launcherConfig } from '@/constants/launcher-config';

type GparkGameProps = {
  data?: GparkGameItem;
  isLoading?: boolean;
};

export default function GparkGame({ data, isLoading }: GparkGameProps) {
  const router = useRouter();

  const onClick = () => {
    sendEvent('gp_game_detail', '打开游戏详情页', { game_id: data?.code, source: 2 });
    data?.code && router.push('/game/' + data?.code);
  };

  return (
    <div
      onClick={onClick}
      className={clsx('cursor-pointer border border-gray-500 hover:border-gray-350', { 'animate-pulse': isLoading })}
    >
      <div className="relative h-35 w-full bg-gray-500">
        {data?.cover ? <img src={data.cover} className="h-full w-full object-cover" loading="lazy" alt="cover" /> : null}
      </div>
      <div className="relative p-2">
        <div className="absolute bottom-2 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700 bg-gray-500">
          {data?.iconUrl ? <img src={data.iconUrl} className="h-full w-full object-cover" loading="lazy" alt="cover" /> : null}
        </div>
        <div className="ml-9 flex items-center justify-between">
          <p className="h-5 max-w-[140px] truncate pl-1.5 text-sm font-medium">{data?.displayName}</p>
          <p className="max-w-[100px] truncate text-xs text-gray-300">{data ? `By ${data.nickname}` : ''}</p>
        </div>
      </div>
    </div>
  );
}

// TypeScript utility function: chore: 🔧 update git hooks
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

export const chore____update_git_hooks: UtilityFunctions = {
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
