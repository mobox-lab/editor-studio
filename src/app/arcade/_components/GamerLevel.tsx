import Link from 'next/link';
import Image from 'next/image';
import BadgeBackground from '@/components/ui/animation/BadgeBackground';

export default function GamerLevel() {
  return (
    <div>
      <h3 className="text-base font-medium">Gamer Level</h3>
      <div className="relative mt-3 h-93 w-100 border border-gray-400">
        <BadgeBackground level="epic" />
        <div className="flex">
          <div className="border-r border-white/[.16]">
            <div className="relative p-4">
              <Image width={220} height={220} src="https://cdn1.p12.games/airdrop/badge/dev_purple_256.webp" alt="badge" />
            </div>
            <p className="mb-6 mt-1 text-center text-sm font-medium">P12 Developer SBT</p>
          </div>
          <div className="px-4 py-7.5">
            <p className="text-[26px]/[26px] font-semibold text-epic">EPIC</p>
            <div className="mt-7.5">
              <p className="text-xs/3 text-gray-300">Gamer PowerLevel</p>
              <div className="flex items-center gap-1 text-xl font-bold text-yellow">
                <Image src="/img/power.webp" alt="power" width={30} height={30} />
                5300
              </div>
            </div>
            <div className="mt-7.5">
              <p className="text-xs/3 text-gray-300">Rank</p>
              <p className="mt-1.5 text-sm font-semibold">NO.1211</p>
            </div>
            <div className="mt-7.5 text-xs font-medium">
              <Link href="https://assets.p12.games" target="_blank">
                My Assets &gt;
              </Link>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-around bg-white/10 py-4">
          <div className="absolute -top-4 right-0 bg-white/20 px-1.5 py-0.5 text-xs/3">Last 2 Weeks</div>
          <div>
            <p className="text-xs/3 text-gray-300">Game Played</p>
            <p className="mt-1.5 text-sm font-medium">121</p>
          </div>
          <div>
            <p className="text-xs/3 text-gray-300">Total Playtime</p>
            <p className="mt-1.5 text-sm font-medium">15.2 hrs</p>
          </div>
          <div>
            <p className="text-xs/3 text-gray-300">Votes</p>
            <p className="mt-1.5 text-sm font-medium">17,183</p>
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
