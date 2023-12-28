'use client';
import Link from 'next/link';
import MyGameItem from '@/app/(home)/_components/MyGameItem';
import Right from '@/../public/svg/right.svg?component';
import { useFetchEditorGameListTop3 } from '@/hooks/editor/useFetchGameList';
import { useFetchRank } from '@/hooks/editor/useFetchRank';
import { rankConfig } from '@/constants';
import { openExternalLink, shortenShowName } from '@/utils';
import { DEV_BADGES } from '@/constants/bages';
import { SBT_LEVEL } from '@/constants/enum';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import StyledButton from '@/components/ui/button/StyledButton';
import { useEffect, useState } from 'react';
import { DataListType } from '@/api';
import { editorGamesTop3ListAtom } from '@/atoms/editor';
import { useAtomValue } from 'jotai';
import Empty from '@/components/ui/empty';

export default function MyGames({ isP12User = false }: { isP12User?: boolean }) {
  const data = useAtomValue(editorGamesTop3ListAtom);
  const { refetch } = useFetchEditorGameListTop3();
  const { firstThree, rest } = useFetchRank();

  const [fillData, setFillData] = useState<(null | DataListType)[]>([null, null, null]);

  useEffect(() => {
    if (data) {
      if (data.length < 3) {
        const newData: (null | DataListType)[] = [...data];
        newData.length = 3;
        newData.fill(null, data.length);
        setFillData(newData);
      } else {
        setFillData(data);
      }
    } else {
      setFillData([null, null, null]);
    }
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">My Games</h3>
        <Link href="/developer/games">
          View all
          <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
        </Link>
      </div>

      {fillData.some((el) => el !== null) ? (
        <div className="mt-3 grid grid-cols-3 gap-4">
          {fillData?.map((item) => {
            return <MyGameItem key={item?.sourceGameId} gameInfo={item} refetchGameList={refetch} />;
          })}
        </div>
      ) : (
        <div className="flex-center mt-3 h-[280px] border border-gray-500 bg-gray-550/10">
          <Empty />
        </div>
      )}

      {!isP12User && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <StyledButton
            variant="gradient-play"
            className="h-12 w-[192px] text-black"
            onClick={() => openExternalLink('https://assets.p12.games/')}
            disabled
          >
            Developer Center
          </StyledButton>
          <StyledButton
            variant="bordered"
            className="h-12 w-[192px]"
            onClick={() => openExternalLink('https://arcana.p12.games/')}
          >
            Arcana
          </StyledButton>
        </div>
      )}

      <div className="mt-6 grid min-h-[120px] grid-cols-2 divide-x divide-gray-500">
        <div className="pr-4">
          <div className="flex items-center text-xs text-gray-300">
            <div className="w-10">NO.</div>
            <div className={clsx('w-30', { 'w-40': !isP12User })}>Name</div>
            <div className={clsx('w-30', { 'w-40': !isP12User })}>Level</div>
            <div className="w-12 text-right">Games</div>
            <div className="flex-1 text-right">WAU</div>
          </div>
          {firstThree.map((item, index) => {
            const { icon, alt } = rankConfig?.[index + 1] ?? {};
            const realShowName = shortenShowName(item.arcanaPower?.showName ?? item.walletAddress, 14);
            const devNft = item.p12GenesisNFT.find((o) => o.nftType === 'developer');
            return (
              <div className="mt-3 flex items-center text-sm" key={item.walletAddress}>
                <div className="w-10">
                  <img src={icon} alt={alt} className="h-6 w-6" />
                </div>
                <div className={clsx('w-30 font-medium', { 'w-40': !isP12User })}>{realShowName}</div>
                <div className={clsx('w-30 font-medium', { 'w-40': !isP12User })}>
                  {devNft ? (
                    <div className="flex items-center gap-1">
                      <img src={DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.img} className="h-5 w-5" alt="nft" />
                      <div className={twMerge(clsx('font-semibold'), DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.color)}>
                        {DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.rarity?.toUpperCase()}
                      </div>
                    </div>
                  ) : (
                    '--'
                  )}
                </div>
                <div className="w-12 text-right font-semibold">{item._count.arcanaGames}</div>
                <div className="flex-1 text-right">--</div>
              </div>
            );
          })}
        </div>

        <div className="pl-4">
          <div className="flex text-xs text-gray-300">
            <div className={clsx('w-10')}>NO.</div>
            <div className={clsx('w-30', { 'w-40': !isP12User })}>Name</div>
            <div className={clsx('w-30', { 'w-40': !isP12User })}>Level</div>
            <div className="w-12 text-right">Games</div>
            <div className="flex-1 text-right">WAU</div>
          </div>
          <div className="mt-3 max-h-[100px] overflow-auto">
            {rest.map((item, index) => {
              const realShowName = shortenShowName(item.arcanaPower?.showName ?? item.walletAddress, 14);
              const devNft = item.p12GenesisNFT.find((o) => o.nftType === 'developer');
              return (
                <div className="mb-3 flex items-center text-sm" key={item.walletAddress}>
                  <div className="w-10 font-semibold leading-6">{index + 4}</div>
                  <div className={clsx('w-30 font-medium', { 'w-40': !isP12User })}>{realShowName}</div>
                  <div className={clsx('w-30 font-medium', { 'w-40': !isP12User })}>
                    {devNft ? (
                      <div className="flex items-center gap-1">
                        <img src={DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.img} className="h-5 w-5" alt="nft" />
                        <div className={twMerge(clsx('font-semibold'), DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.color)}>
                          {DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.rarity?.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      '--'
                    )}
                  </div>
                  <div className="w-12 text-right font-semibold">{item._count.arcanaGames}</div>
                  <div className="flex-1 text-right">--</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
