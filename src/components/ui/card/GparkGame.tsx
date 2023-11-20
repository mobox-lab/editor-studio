'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GparkGameItem } from '@/api';

type GparkGameProps = {
  data?: GparkGameItem;
};

export default function GparkGame({ data }: GparkGameProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/game/' + data?.code)}
      className="cursor-pointer border border-gray-500 hover:border-gray-350"
    >
      <div className="relative h-35 w-full bg-gray-500">
        {data?.iconUrl ? <Image src={data.iconUrl} style={{ objectFit: 'cover' }} alt="game-image" fill /> : null}
      </div>
      <div className="relative p-2">
        <div className="absolute bottom-2 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700 bg-gray-500">
          {data?.iconUrl ? <Image src={data.iconUrl} style={{ objectFit: 'cover' }} alt="game-image" fill /> : null}
        </div>
        <div className="ml-9 flex items-center justify-between">
          <p className="max-w-[140px] truncate pl-1.5 text-sm font-medium">{data?.displayName ?? '--'}</p>
          <p className="text-xs text-gray-300">By {data?.nickname ?? '--'}</p>
        </div>
      </div>
    </div>
  );
}
