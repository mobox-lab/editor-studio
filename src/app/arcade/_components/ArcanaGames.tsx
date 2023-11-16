import ArcanaGame from '@/components/ui/card/ArcanaGame';
import Image from 'next/image';
import Right from '@/../public/svg/right.svg?component';

export default function ArcanaGames() {
  return (
    <div className="-inset-x-15 absolute grid grid-cols-5 gap-4">
      <div className="h-30 flex-center absolute -left-5 top-1/2 w-5 -translate-y-1/2 cursor-pointer border border-r-0 border-gray-400/50 bg-white/10 hover:bg-white/20">
        <Right className="w-4.5 rotate-180 fill-white" />
      </div>
      <ArcanaGame />
      <ArcanaGame />
      <ArcanaGame />
      <ArcanaGame />
      <ArcanaGame />
      <div className="h-30 flex-center absolute -right-5 top-1/2 w-5 -translate-y-1/2 cursor-pointer border border-l-0 border-gray-400/50 bg-white/10 hover:bg-white/20">
        <Right className="w-4.5 fill-white" />
      </div>
    </div>
  );
}
