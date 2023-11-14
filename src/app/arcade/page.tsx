import GamerLevel from '@/app/arcade/_components/GamerLevel';
import Selection from '@/app/arcade/_components/Selection';
import Recommended from '@/app/arcade/_components/Recommended';

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
            <div className="w-32 rounded-lg bg-white/10 py-2.5 text-center text-xs/5 font-medium">My Games: 8</div>
            <div className="w-full rounded-lg bg-white/10 py-2.5 text-xs/5">search</div>
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
