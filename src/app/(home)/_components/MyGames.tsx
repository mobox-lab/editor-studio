import Link from 'next/link';
import MyGameItem from '@/app/(home)/_components/MyGameItem';

export default function MyGames() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">My Games</h3>
        <Link href="/">View all &gt;</Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MyGameItem />
        <MyGameItem />
        <MyGameItem />
      </div>
    </div>
  );
}
