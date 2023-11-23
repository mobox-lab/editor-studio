'use client';
import { P12GameInfo } from '@/api';
import { clsxm } from '@/utils';
import { shortenShowName } from '@/utils/shorten';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type ArcanaGameProps = {
  data?: P12GameInfo;
  isLoading?: boolean;
  className?: string;
  showWeekInfo?: boolean;
};
export default function ArcanaGame({ data, className, showWeekInfo = true, isLoading }: ArcanaGameProps) {
  const router = useRouter();
  const { mwGameCode, mainImage, gameName, gameDescription, gameVotes, showName, walletAddress } = data ?? {};
  const realShowName = useMemo(() => shortenShowName(showName ?? walletAddress), [showName, walletAddress]);

  return (
    <div
      onClick={() => router.push(`/game/${mwGameCode}`)}
      className={clsxm(
        'cursor-pointer border border-gray-500 hover:border-gray-350',
        { 'h-44 animate-pulse border-none bg-gray-600': isLoading },
        className,
      )}
    >
      <div className="relative h-31.5 w-full">
        {gameVotes ? (
          <div className="absolute left-0 top-0 rounded-br bg-black/40 px-1.5 py-1 text-sm text-red-300">{gameVotes}</div>
        ) : null}
        {mainImage ? <Image src={mainImage} style={{ objectFit: 'cover' }} alt="game-image" fill /> : null}
      </div>
      <div className="relative px-2 py-1.5">
        {mainImage ? (
          <div className="absolute -top-2.5 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700">
            <Image src={mainImage} style={{ objectFit: 'cover' }} alt="game-image" fill />
          </div>
        ) : null}
        <div className="ml-9 flex items-center justify-between">
          <p className="truncate pl-1.5 text-sm font-medium">{gameName}</p>
          {realShowName ? <p className="truncate text-xs text-gray-300">By {realShowName}</p> : null}
        </div>
        <p className="mt-1 truncate text-xs">{gameDescription}</p>
      </div>
    </div>
  );
}
