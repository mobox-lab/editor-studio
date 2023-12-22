import clsx from 'clsx';
import { useMemo } from 'react';
import { openExternalLink } from '@/utils';
import { NFT_CLAIM } from '@/constants/enum';
import { GAMER_BADGES } from '@/constants/bages';
import Right from '@/../public/svg/right.svg?component';
import { useFetchSBT } from '@/hooks/editor/useFetchSBT';
import BadgeBackground from '@/components/ui/animation/BadgeBackground';

export default function GamerLevel() {
  const { data } = useFetchSBT('gamer');
  const nftConfig = useMemo(() => (data && data.nftClaim > 0 ? GAMER_BADGES[data.nftLevel] : undefined), [data]);
  const canClaim = useMemo(() => data?.nftType && data.nftClaim === NFT_CLAIM.UNCLAIMED, [data?.nftClaim, data?.nftType]);

  return (
    <div>
      <h3 className="text-base font-medium">Gamer Level</h3>
      <div className="relative mt-3 h-93 w-100 border border-gray-400">
        <BadgeBackground level={nftConfig?.rarity} />
        <div className="flex">
          <div className="border-r border-white/[.16]">
            <div className="relative p-4">
              {nftConfig ? (
                <img src={nftConfig?.asset256} alt="nft" width={220} height={220} />
              ) : (
                <img src="/svg/unclaimed.svg" className="p-4" alt="unclaimed" width={220} height={220} />
              )}
            </div>
            {canClaim ? (
              <p
                onClick={() => openExternalLink(nftConfig?.claim ?? '')}
                className="flex-center h-12 cursor-pointer bg-gradient-play text-base font-bold text-black"
              >
                YOU CAN CLAIM!
              </p>
            ) : (
              <p className="pb-6 pt-1 text-center text-sm font-medium">P12 Gamer SBT</p>
            )}
          </div>
          <div className="px-4 py-7.5">
            <p className={clsx('text-[26px]/[26px] font-medium', nftConfig?.color ?? 'text-gray-300')}>
              {nftConfig?.rarity ?? 'NULL'}
            </p>
            <div className="mt-7.5">
              <p className="text-xs/3 text-gray-300">Gamer PowerLevel</p>
              <div className="mt-1 flex items-center gap-1 text-xl font-bold text-yellow">
                <img src="/img/power.webp" alt="power" width={30} height={30} />
                {data?.power ?? 0}
              </div>
            </div>
            <div className="mt-7.5">
              <p className="text-xs/3 text-gray-300">Gamer Rank</p>
              <p className="mt-1.5 text-sm font-semibold">NO.{data?.rank ?? 0}</p>
            </div>
            <div className="mt-7.5 text-xs font-medium">
              <div
                className="text-link flex items-center text-blue"
                onClick={() => openExternalLink('https://assets.p12.games/')}
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
