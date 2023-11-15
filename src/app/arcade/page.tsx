import GamerLevel from '@/app/arcade/_components/GamerLevel';
import Selection from '@/app/arcade/_components/Selection';
import Recommended from '@/app/arcade/_components/Recommended';
import Search from '@/../public/svg/search.svg?component';

export default function Arcade() {
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
            <div className="flex w-full items-center gap-2 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5">
              <Search />
              <input type="text" className="w-4/5 bg-transparent text-xs/5" placeholder="work name..." />
            </div>
          </div>
          <div className="mt-3">
            <Recommended />
          </div>
        </div>
        <div>1</div>
      </div>
    </div>
  );
}
