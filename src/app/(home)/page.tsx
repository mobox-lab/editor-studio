import DeveloperLevel from '@/app/(home)/_components/DeveloperLevel';
import MyGames from '@/app/(home)/_components/MyGames';
import StyledButton from '@/components/ui/button/StyledButton';
import News from './_components/News';

export default function Home() {
  return (
    <div className="">
      <div className="flex gap-5">
        <div>
          <DeveloperLevel />
          <div className="mt-4 flex gap-4">
            <StyledButton variant="gradient" className="h-12 w-[192px] text-black">
              Developer Center
            </StyledButton>
            <StyledButton variant="bordered" className="h-12 flex-1">
              Arcana
            </StyledButton>
          </div>
        </div>

        <MyGames />
      </div>
      <div className="mt-7.5">
        <div className="font-semibold leading-6">News & Updates</div>
        <div className="mt-3 grid grid-cols-4 gap-4">
          <News />
          <News />
          <News />
          <News />
        </div>
      </div>
    </div>
  );
}
