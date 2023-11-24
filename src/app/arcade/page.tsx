'use client';
import Link from 'next/link';
import Search from '@/components/ui/search';
import { useRouter } from 'next/navigation';
import GamerLevel from '@/app/arcade/_components/GamerLevel';
import Selection from '@/app/arcade/_components/Selection';
import Recommended from '@/app/arcade/_components/Recommended';
import Continue from '@/app/arcade/_components/Continue';
import ArcanaGames from '@/app/arcade/_components/ArcanaGames';
import Category from '@/app/arcade/_components/Category';
import Right from '@/../public/svg/right.svg?component';
import { useGparkCardPage } from '@/hooks/arcade/useGparkCardPage';

export default function Arcade() {
  const router = useRouter();
  const { isLoading } = useGparkCardPage();

  const onSearchClick = (text: string) => {
    router.push('/search?q=' + encodeURIComponent(text));
  };

  return (
    <div>
      <div className="flex gap-5">
        <GamerLevel />
        <Selection />
      </div>
      <div className="mt-7.5 flex gap-5">
        <div>
          <div className="flex gap-3">
            <div className="w-32 cursor-pointer rounded-sm bg-white/10 py-2.5 text-center text-xs/5 font-medium">
              My Games: 8
            </div>
            <Search onEnterUp={onSearchClick} className="w-full" />
          </div>
          <div className="mt-3">
            <Recommended isLoading={isLoading} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex h-10 items-end">
            <p className="text-base font-semibold">Continue</p>
          </div>
          <div className="mt-3">
            <Continue />
          </div>
        </div>
      </div>
      <div className="mt-7.5">
        <div className="flex-center gap-4">
          <h2 className="text-base font-medium">Arcana Games</h2>
          <Link className="text-sm font-medium" href="/">
            View All
            <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
          </Link>
        </div>
        <div className="relative mt-3 h-[180px]">
          <ArcanaGames />
        </div>
        <div className="mt-9">
          <Category isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
