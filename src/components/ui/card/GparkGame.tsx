'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GparkGame() {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/game/1001')} className="cursor-pointer border border-gray-500 hover:border-gray-350">
      <div className="relative h-35 w-full">
        <Image
          src="https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9"
          style={{ objectFit: 'cover' }}
          alt="game-image"
          fill
        />
      </div>
      <div className="relative p-2">
        <div className="absolute bottom-2 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700">
          <Image
            src="https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9"
            style={{ objectFit: 'cover' }}
            alt="game-image"
            fill
          />
        </div>
        <div className="ml-9 flex items-center justify-between">
          <p className="pl-1.5 text-sm font-medium">BarbieLand</p>
          <p className="text-xs text-gray-300">By PROCENT</p>
        </div>
      </div>
    </div>
  );
}
