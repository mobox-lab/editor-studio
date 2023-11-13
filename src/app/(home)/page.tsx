import DeveloperLevel from '@/app/(home)/_components/DeveloperLevel';
import MyGames from '@/app/(home)/_components/MyGames';

export default function Home() {
  return (
    <div className="">
      <div className="flex gap-5">
        <DeveloperLevel />
        <MyGames />
      </div>
    </div>
  );
}
