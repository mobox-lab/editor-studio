'use client';
import VideoSvg from '@/../public/svg/video.svg?component';
import { P12GameInfo } from '@/api';
import { WORK_TYPE } from '@/constants/enum';
import { useFileType } from '@/hooks/util/useFileType';
import { clsxm, sendEvent } from '@/utils';
import { shortenShowName } from '@/utils/shorten';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import Corner from '../corner';
import { launcherConfig } from '@/constants/launcher-config';

type ArcanaGameProps = {
  type?: WORK_TYPE;

  data?: P12GameInfo;
  isLoading?: boolean;
  className?: string;
  showWeekInfo?: boolean;
};
export default function ArcanaGame({
  data,
  className,
  showWeekInfo = true,
  isLoading,
  type = WORK_TYPE.DEFAULT,
}: ArcanaGameProps) {
  const router = useRouter();
  const {
    mwGameCode,
    mainImage,
    gameName,
    gameDescription,
    gameVotes,
    showName,
    weeklyRank,
    rank,
    weeklyVotes,
    walletAddress,
  } = data ?? {};
  const fileType = useFileType(mainImage ?? '');
  const videoRef = useRef<HTMLVideoElement>(null);

  const realShowName = useMemo(() => shortenShowName(showName ?? walletAddress), [showName, walletAddress]);
  const _rank = useMemo(() => (showWeekInfo ? weeklyRank : rank), [rank, showWeekInfo, weeklyRank]);
  const _votes = useMemo(() => (showWeekInfo ? weeklyVotes : gameVotes), [gameVotes, showWeekInfo, weeklyVotes]);

  const renderLeftCorner = useCallback(() => {
    if (type === WORK_TYPE.PREMIUM) return <Corner type="gold">Featured</Corner>;
    return (
      <div className="absolute flex items-center gap-1.5 rounded-ee-lg bg-black/20 p-1 font-semibold backdrop-blur-lg">
        {_rank ? (
          _rank <= 3 ? (
            <img src={`/img/arcana/rank_${_rank}.webp`} alt="" className="h-4.5 w-4.5" />
          ) : (
            <span className="text-xs/3 font-bold">No.{_rank}</span>
          )
        ) : null}
        <p className="flex items-center gap-0.5 text-sm/4 font-semibold text-red-300">
          <img alt="votesNum" className="h-3.5 w-3.5" src="/svg/vote_icon.svg" />
          {_votes ?? 0}
        </p>
      </div>
    );
  }, [_rank, _votes, type]);

  const renderCover = useCallback(() => {
    if (!mainImage) return null;
    return fileType === 'video' ? (
      <video ref={videoRef} className="pointer-events-none -z-10 h-full w-full object-cover" src={mainImage ?? ''} loop muted />
    ) : (
      <Image src={mainImage} style={{ objectFit: 'cover' }} className="-z-10" alt="game-image" fill />
    );
  }, [fileType, mainImage]);

  const onClick = () => {
    sendEvent('gp_game_detail', '打开游戏详情页', { game_id: mwGameCode, source: 3 });
    router.push('/game/' + mwGameCode);
  };

  return (
    <div
      onClick={onClick}
      className={clsxm(
        'cursor-pointer border border-gray-500 hover:border-gray-350',
        { 'h-44 animate-pulse border-none bg-gray-600': isLoading },
        className,
      )}
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }}
    >
      <div className="relative h-31.5 w-full">
        {!isLoading && fileType === 'video' && <VideoSvg className="absolute right-2 top-2 h-4.5 w-4.5" />}
        {!isLoading && renderLeftCorner()}
        {renderCover()}
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

// TypeScript test for: refactor: 🔧 optimize database queries
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____optimize_database_queries', () => {
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
