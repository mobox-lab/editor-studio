'use client';
import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { GparkGameAuthor, GparkGameDetail } from '@/api';
import StyledButton from '@/components/ui/button/StyledButton';

type GamePanelProps = {
  data?: GparkGameDetail;
  isLoading?: boolean;
  handleRunningGame?: () => void;
};

export default function GamePanel({ data, isLoading, handleRunningGame }: GamePanelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageList = useMemo(() => data?.images?.map((item) => item.url) ?? [], [data?.images]);
  const author = useMemo<GparkGameAuthor | undefined>(() => data?.author ?? undefined, [data?.author]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imageList.length]);

  return (
    <div className="grid grid-cols-2 border border-gray-500 bg-gray-550/10">
      <div>
        <div className="relative h-[338px]">
          {imageList.length ? (
            <img src={imageList[selectedIndex]} loading="lazy" className="h-full w-full object-cover" alt="cover" />
          ) : null}
        </div>
        <div className="flex h-20 gap-2 p-2">
          {imageList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={clsx('relative h-16 w-27.5 cursor-pointer', { 'boeder-white border': selectedIndex === index })}
            >
              <img src={item} className="h-full w-full object-cover" loading="lazy" alt="cover" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="relative h-[338px] px-6 pt-6">
          <h1 className="h-9 text-3xl font-semibold">{data?.name}</h1>
          <div className="mt-6 h-48 overflow-y-scroll whitespace-pre-line text-xs/5">{data?.description}</div>
          <div className="absolute bottom-0 flex h-11 items-center gap-2">
            <div className="relative h-10.5 w-10.5 overflow-hidden rounded-full">
              {author && <img className="h-full w-full object-cover" loading="lazy" src={author.avatar} alt="avatar" />}
            </div>
            <div className="">
              <div className="text-base/5">
                <span className="font-medium">{author?.name}</span>&nbsp;
              </div>
              <div className="mt-0.5 text-xs/5">{author?.introduction}</div>
            </div>
          </div>
        </div>
        <div className="mt-2 px-6 py-2">
          <StyledButton
            variant="gradient-play"
            loading={isLoading}
            onClick={handleRunningGame}
            className="w-[400px] flex-1 py-3.5 text-base/5 font-bold text-black"
          >
            Play Now
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
