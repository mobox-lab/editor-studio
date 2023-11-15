import Image from 'next/image';

export default function ArcanaGame() {
  return (
    <div className="hover:border-gray-350 cursor-pointer border border-gray-500">
      <div className="h-31.5 relative w-full">
        <div className="absolute left-0 top-0 rounded-br bg-black/40 px-1.5 py-1 text-sm text-red-300">10303</div>
        <Image
          src="https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9"
          style={{ objectFit: 'cover' }}
          alt="game-image"
          fill
        />
      </div>
      <div className="relative px-2 py-1.5">
        <div className="absolute -top-2.5 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700">
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
        <p className="mt-1 truncate text-xs">
          We hope you enjoy the BarbieLand location! Our profile: http://link3.to/procent_crypto
        </p>
      </div>
    </div>
  );
}
