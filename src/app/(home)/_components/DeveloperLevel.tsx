import BadgeBackground from '@/components/ui/animation/BadgeBackground';
import Image from 'next/image';
import Right from '@/../public/svg/right.svg?component';

export default function DeveloperLevel() {
  return (
    <div>
      <h3 className="text-base font-medium">Developer Level</h3>
      <div className="relative mt-3 flex h-93 w-100 flex-col border border-gray-400">
        <BadgeBackground />
        <div className="flex basis-[297px]">
          <div className="flex w-[252px] flex-col items-center justify-center gap-5">
            <Image src="/svg/unclaimed.svg" alt="unclaimed" width={220} height={200} />
            <div className="text-sm/5 font-semibold">P12 Developer SBT</div>
          </div>
          <div className="border-white/15 w-[148px] border-l px-4">
            <div className="mt-7.5 text-xl/6 font-bold">RARE</div>
            <div className="mt-7.5 text-xs text-gray-300">Dev PowerLevel</div>
            <div className="mt-1 flex items-center gap-1">
              <Image src="/img/power.webp" alt="power" width={30} height={30} />
              <span className="text-xl/7 font-bold text-yellow">5300</span>
            </div>
            <div className="mt-7.5 text-xs text-gray-300">Dev Rank</div>
            <div className="mt-1 text-sm/5 font-semibold">NO.1211</div>

            <div className="mt-7.5 flex items-center text-xs font-medium text-blue">
              My Assets <Right className="fill-blue" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-between bg-white/10 px-4 pt-5">
          <div>
            <div className="text-xs/3 text-gray-300">Games Played</div>
            <div className="mt-1.5 text-sm/5 font-semibold">123</div>
          </div>
          <div>
            <div className="text-xs/3 text-gray-300">Total Playtime</div>
            <div className="mt-1.5 text-sm/5 font-semibold">123 hrs</div>
          </div>
          <div>
            <div className="text-xs/3 text-gray-300">Votes</div>
            <div className="mt-1.5 text-sm/5 font-semibold">123</div>
          </div>
          <div>
            <div className="text-xs/3 text-gray-300">Comments</div>
            <div className="mt-1.5 text-sm/5 font-semibold">--</div>
          </div>
        </div>
      </div>
    </div>
  );
}
