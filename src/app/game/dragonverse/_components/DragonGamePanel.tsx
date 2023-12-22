'use client';
import { GparkGameDetail } from '@/api';
import StyledButton from '@/components/ui/button/StyledButton';
import Tag from '@/components/ui/tag';
import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import DragonBorder from './DragonBorder';

type DragonGamePanelProps = {
  data?: GparkGameDetail;
  isLoading?: boolean;
  handleRunningGame?: () => void;
};

export default function DragonGamePanel({ data, isLoading, handleRunningGame }: DragonGamePanelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageList = useMemo(() => data?.images.map((item) => item.url) ?? [], [data?.images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imageList.length]);

  return (
    <div className="grid grid-cols-2 border border-gray-400 bg-gray-550/10">
      <div>
        <div className="relative h-[338px]">
          {imageList.length ? (
            <img
              src={imageList[selectedIndex]}
              loading="lazy"
              className="absolute -left-px -top-px z-10 h-full w-full object-cover"
              alt="cover"
            />
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
      <div className="relative p-3">
        <DragonBorder className="inset-2 -z-10" />
        <div className="relative px-6 pt-6">
          <img draggable={false} src="/img/gpark/dragon-title.webp" alt="DragonVerse" className="h-15" />
          <div className="mt-3 flex h-5 items-center gap-1.5">
            <Tag>Mobox</Tag>
            <Tag>Vista</Tag>
          </div>
          <div className="mt-6 h-20 overflow-y-scroll whitespace-pre-line text-xs/5">{data?.description}</div>
          <img src="/img/gpark/mobox.webp" alt="mobox-icon" className="mt-6 h-4" />
          {/* <div className="absolute bottom-0 flex h-11 items-center gap-2">
            <div className="relative h-10.5 w-10.5 overflow-hidden rounded-full">
              {author && <img className="h-full w-full object-cover" loading="lazy" src={author.avatar} alt="avatar" />}
            </div>
            <div className="">
              <div className="text-base/5">
                <span className="font-medium">{author?.name}</span>&nbsp;
              </div>
              <div className="mt-0.5 text-xs/5">{author?.introduction}</div>
            </div>
          </div> */}
        </div>
        <div className="mb-3 mt-17 px-6">
          <StyledButton
            variant="gradient-play"
            loading={isLoading}
            onClick={handleRunningGame}
            className="h-12 w-[400px] flex-1 text-base/5 font-bold text-black"
          >
            Play Now
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
