import clsx from 'clsx';
import { useMemo } from 'react';
import { openExternalLink, sendEvent } from '@/utils';
import { NFT_CLAIM } from '@/constants/enum';
import { DEV_BADGES } from '@/constants/bages';
import Right from '@/../public/svg/right.svg?component';
import { useFetchSBT } from '@/hooks/editor/useFetchSBT';
import BadgeBackground from '@/components/ui/animation/BadgeBackground';

export default function DeveloperLevel() {
  const { data } = useFetchSBT('developer');
  const nftConfig = useMemo(() => (data && data.nftLevel !== undefined ? DEV_BADGES[data.nftLevel] : undefined), [data]);
  const canClaim = useMemo(() => data?.nftType && data.nftClaim === NFT_CLAIM.UNCLAIMED, [data?.nftClaim, data?.nftType]);

  return (
    <div>
      <h3 className="text-base font-medium">Developer Level</h3>
      <div className="relative mt-3 w-100 h-93 border border-gray-400">
        <BadgeBackground level={nftConfig?.rarity} />
        <div className="flex">
          <div className="flex flex-col justify-between border-r border-white/[.16]">
            <div className="relative p-4">
              {nftConfig ? (
                <img src={nftConfig?.asset256} alt="nft" width={220} height={220} />
              ) : (
                <img src="/svg/unclaimed.svg" className="p-4" alt="unclaimed" width={180} height={180} />
              )}
            </div>
            {canClaim ? (
              <p
                onClick={() => {
                  sendEvent('ed_sbt_claim', '跳转galxe claim');
                  openExternalLink(nftConfig?.claim ?? '');
                }}
                className="flex-center h-12 cursor-pointer bg-gradient-play text-base font-bold text-black"
              >
                YOU CAN CLAIM!
              </p>
            ) : (
              <p className="pb-6 pt-1 text-center text-sm font-medium">P12 Developer SBT</p>
            )}
          </div>
          <div className="px-4 py-7.5">
            <p className={clsx('text-[22px]/[26px] font-bold font-ddin', nftConfig?.color ?? 'text-gray-300')}>
              {nftConfig?.rarity ?? 'NULL'}
            </p>
            <div className="mt-7.5">
              <p className="text-xs/3 text-gray-300">Dev PowerLevel</p>
              <div className="mt-1 flex items-center gap-1 text-xl font-bold text-yellow">
                <img src="/img/power.webp" alt="power" width={30} height={30} />
                {data?.power ?? 0}
              </div>
            </div>
            <div className="mt-7.5">
              <p className="text-xs/3 text-gray-300">Dev Rank</p>
              <p className="mt-1.5 text-sm font-semibold">NO.{data?.rank ?? 0}</p>
            </div>
            <div className="mt-7.5 text-xs font-medium">
              <div
                className="text-link flex items-center text-blue"
                onClick={() => {
                  sendEvent('ed_sbt_assets_link', '跳转assets外链', { sbt_status: nftConfig?.rarity ? 1 : canClaim ? 2 : 3 });
                  openExternalLink('https://assets.p12.games/');
                }}
              >
                My Assets <Right className="fill-blue" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-around bg-white/10 py-4">
          <div>
            <p className="text-xs/3 text-gray-300">Game Played</p>
            <p className="mt-1.5 text-sm font-medium">--</p>
          </div>
          <div>
            <p className="text-xs/3 text-gray-300">Total Playtime</p>
            <p className="mt-1.5 text-sm font-medium">--</p>
          </div>
          <div>
            <p className="text-xs/3 text-gray-300">Votes</p>
            <p className="mt-1.5 text-sm font-medium">{data?.vote ?? 0}</p>
          </div>
          <div>
            <p className="text-xs/3 text-gray-300">Comments</p>
            <p className="mt-1.5 text-sm font-medium">--</p>
          </div>
        </div>
      </div>
    </div>
  );
}
