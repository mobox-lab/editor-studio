import Refresh from '@/../public/svg/refresh.svg?component';
import GparkGame from '@/components/ui/card/GparkGame';

export default function Recommended() {
  return (
    <div className="w-[930px] border border-gray-400 px-4 pb-4 pt-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Recommend</h3>
        <div>
          <Refresh className="cursor-pointer duration-500 hover:rotate-180" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-4">
        <GparkGame />
        <GparkGame />
        <GparkGame />
        <GparkGame />
        <GparkGame />
        <GparkGame />
      </div>
    </div>
  );
}
