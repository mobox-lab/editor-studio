'use client';
import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';
import Tag from '@/components/ui/tag';
import { GparkGameDetail } from '@/api';
import DragonBorder from './DragonBorder';
import { clsxm, openExternalLink } from '@/utils';
import KeySvg from '../../../../../public/svg/key.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';
import { dragonverseBetaDialogOpen } from '@/atoms/gpark/dragonverse';

type DragonGamePanelProps = {
  data?: GparkGameDetail;
  isLoading?: boolean;
  handleRunningGame?: () => void;
  stop?: boolean;
};

export default function DragonGamePanel({ data, isLoading, handleRunningGame, stop }: DragonGamePanelProps) {
  const setDialogOpen = useSetAtom(dragonverseBetaDialogOpen);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clickCount, setClickCouent] = useState(0);
  const imageList = useMemo(() => data?.images.map((item) => item.url) ?? [], [data?.images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imageList.length]);

  useEffect(() => {
    if (clickCount === 8) {
      setDialogOpen(true);
    }
  }, [clickCount, setDialogOpen]);

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
          <img
            onClick={() => setClickCouent((c) => c + 1)}
            draggable={false}
            src="/img/gpark/dragon-title.webp"
            alt="DragonVerse"
            className="h-15"
          />
          <div className="mt-3 flex h-5 items-center gap-1.5">
            <Tag>Mobox</Tag>
            <Tag>Vista</Tag>
          </div>
          <div className="mt-6 h-20 overflow-y-scroll whitespace-pre-line text-xs/5">{data?.description}</div>
          <img src="/img/gpark/mobox.webp" alt="mobox-icon" className="mt-6 h-4" />
        </div>
        <div className="mb-3 mt-17 flex gap-3 px-6">
          <StyledButton
            disabled={stop}
            variant="gradient-red"
            loading={isLoading}
            onClick={() => {
              if (stop) return;
              handleRunningGame?.();
            }}
            className={clsxm('h-12 w-[322px] flex-1 text-lg/5 font-bold', {
              'border-none bg-[#232328] text-gray-450 hover:bg-[#232328]': stop,
            })}
          >
            {stop ? 'Coming Soon' : 'Play Now'}
          </StyledButton>
          <StyledButton className="h-12 px-6" onClick={() => openExternalLink('https://dragonverseneo.mobox.app/')}>
            <KeySvg className="mr-1.5" />
            Get DragonKey
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
