'use client';

import { launcherConfig } from '@/constants/launcher-config';
import { useRouter } from 'next/navigation';

export default function DragonSelection() {
  const router = useRouter();

  return (
    <div className="flex-1">
      <h3 className="text-base font-medium">Selection</h3>
      <div className="mt-3 gap-3">
        <div
          className="h-93 flex-none cursor-pointer border border-gray-500 hover:border-gray-350"
          onClick={() => router.push(`/game/dragonverse`)}
        >
          <div className="relative h-80 w-full">
            <img className="h-full w-full object-cover" src="/img/gpark/dragon-cover.webp" alt="game-image" />
          </div>
          <div className="relative p-4">
            <div className="absolute bottom-4 left-4 h-15 w-15 overflow-hidden rounded-lg border-2 border-gray-700">
              <img className="h-full w-full object-cover" src="/img/gpark/dragon-icon.webp" alt="game-image" />
            </div>
            <div className="ml-15 flex items-center justify-between">
              <p className="pl-3 text-base/5 font-semibold">Dragonverse NEO</p>
              <img src="/img/gpark/mobox.webp" alt="mobox-icon" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
