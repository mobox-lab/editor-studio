import Link from 'next/link';
import MyGameItem from '@/app/(home)/_components/MyGameItem';
import Right from '@/../public/svg/right.svg?component';

export default function MyGames() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">My Games</h3>
        <Link href="/">
          View all
          <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <MyGameItem />
        <MyGameItem />
        <MyGameItem />
      </div>
    </div>
  );
}
