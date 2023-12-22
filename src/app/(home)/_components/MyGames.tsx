'use client';
import Link from 'next/link';
import MyGameItem from '@/app/(home)/_components/MyGameItem';
import Right from '@/../public/svg/right.svg?component';
import EditCreationDialog from '@/components/ui/dialog/EditCreationDialog';
import { useFetchEditorGameListTop3 } from '@/hooks/editor/useFetchGameList';
import Empty from '@/components/ui/empty';
import { useFetchRank } from '@/hooks/editor/useFetchRank';
import { rankConfig } from '@/constants';
import { openExternalLink, shortenShowName } from '@/utils';
import { DEV_BADGES } from '@/constants/bages';
import { SBT_LEVEL } from '@/constants/enum';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import StyledButton from '@/components/ui/button/StyledButton';

export default function MyGames({ isP12User = false }: { isP12User?: boolean }) {
  const { data, refetch } = useFetchEditorGameListTop3();
  const { firstThree, rest } = useFetchRank();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">My Games</h3>
        <Link href="/developer/games">
          View all
          <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
        </Link>
      </div>
      {(data?.length || 0) > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-4">
          {data?.map((item) => {
            return <MyGameItem key={item.sourceGameId} gameInfo={item} refetchGameList={refetch} />;
          })}
        </div>
      ) : (
        <div className="flex-center mt-3 h-[278px]">
          <Empty />
        </div>
      )}
      {!isP12User && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <StyledButton
            variant="gradient-play"
            className="h-12 w-[192px] text-black"
            onClick={() => openExternalLink('https://assets.p12.games/')}
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

      <div className="mt-6 grid min-h-[140px] grid-cols-2 divide-x divide-gray-500">
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
            const realShowName = shortenShowName(item.arcanaPower.showName ?? item.walletAddress, 14);
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
                      <img src={DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.asset256} className="h-5 w-5" alt="nft" />
                      <div className={twMerge(clsx('font-semibold'), DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.color)}>
                        {DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.rarity}
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
          <div className="mt-3 max-h-[110px] overflow-auto">
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
                        <img src={DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.asset256} className="h-5 w-5" alt="nft" />
                        <div className={twMerge(clsx('font-semibold'), DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.color)}>
                          {DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.rarity}
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
      <EditCreationDialog />
    </div>
  );
}
