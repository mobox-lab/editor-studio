import Link from 'next/link';
import Right from '@/../public/svg/right.svg?component';
import GparkGame from '@/components/ui/card/GparkGame';

type CategoryItemProps = {
  category: string;
};
export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{category}</h3>
        <Link className="text-sm font-medium" href="/">
          More
          <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <GparkGame />
        <GparkGame />
        <GparkGame />
        <GparkGame />
      </div>
    </div>
  );
}
