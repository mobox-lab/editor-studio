import BadgeBackground from '@/components/ui/animation/BadgeBackground';
import Image from 'next/image';

export default function DeveloperLevel() {
  return (
    <div>
      <h3 className="text-base font-medium">Developer Level</h3>
      <div className="relative mt-3 h-93 w-100 border border-gray-400">
        <BadgeBackground />
        <Image src="/svg/unclaimed.svg" className="mx-auto" alt="unclaimed" width={188} height={188} />
      </div>
    </div>
  );
}
