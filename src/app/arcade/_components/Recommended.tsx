import _ from 'lodash-es';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { GparkCardItem } from '@/api';
import GparkGame from '@/components/ui/card/GparkGame';
import Refresh from '@/../public/svg/refresh.svg?component';
import { recommendGameListAtom } from '@/atoms/arcade/recommend';
import { clsx } from 'clsx';

type RecommendedProps = {
  data?: GparkCardItem;
  isLoading?: boolean;
};

export default function Recommended({ data, isLoading }: RecommendedProps) {
  const [dataList, setDataList] = useAtom(recommendGameListAtom);
  const defaultList = useMemo(() => Array.from({ length: 6 }), []);

  useEffect(() => {
    if (!data?.gameList || dataList.length > 0) return;
    setDataList(_.shuffle(data.gameList));
  }, [data?.gameList, dataList.length, setDataList]);

  return (
    <div className="w-[930px] border border-gray-400 px-4 pb-4 pt-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Recommend</h3>
        <div onClick={() => data?.gameList && setDataList(_.shuffle(data.gameList))}>
          <Refresh className="cursor-pointer duration-500 hover:rotate-180" />
        </div>
      </div>
      <div className={clsx('mt-3 grid grid-cols-3 gap-4', { 'animate-pulse': isLoading })}>
        {isLoading
          ? defaultList.map((item, index) => <GparkGame key={index} />)
          : dataList.slice(0, 6).map((game) => <GparkGame key={game.code} data={game} />)}
      </div>
    </div>
  );
}
