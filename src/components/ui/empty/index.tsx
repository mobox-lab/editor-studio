import EmptySVG from '@/../public/svg/empty.svg?component';
import { clsx } from 'clsx';

export default function Empty({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <EmptySVG />
      <p className="mt-4 text-base text-gray-300">No Data</p>
    </div>
  );
}
