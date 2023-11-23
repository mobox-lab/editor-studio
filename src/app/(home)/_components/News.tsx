'use client';
import Image from 'next/image';

export default function News() {
  return (
    <div className="relative cursor-pointer border border-gray-500 hover:border-gray-350">
      <div className="relative h-[163px] w-full">
        <Image
          src="https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9"
          style={{ objectFit: 'cover' }}
          alt="game-image"
          fill
        />
      </div>
      <div className="relative px-2 py-1.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">BarbieLand</p>
          <p className="text-xs text-gray-300">Aug 16 2023</p>
        </div>
        <div className="line-clamp-2 h-8 text-xs/4">
          Ambrus Studio was founded by Johnson, ex-CEO of Asia, Riot Games. First Ga Ambrus Studio was founded by Johnson,
          ex-CEO of Asia, Riot Games. First Ga Ambrus Studio was founded by Johnson, ex-CEO of Asia, Riot Games. First Ga...
        </div>
      </div>
    </div>
  );
}
