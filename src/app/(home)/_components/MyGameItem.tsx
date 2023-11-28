'use client';
import Image from 'next/image';
import VoteIcon from '@/../public/svg/vote_icon.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';
import { arcanaEditCreationDialogOpen } from '@/atoms/category/arcana';
import { useSetAtom } from 'jotai';

export default function MyGameItem() {
  const setOpen = useSetAtom(arcanaEditCreationDialogOpen);

  return (
    <div className="relative cursor-pointer border border-gray-500 hover:border-gray-350" onClick={() => setOpen(true)}>
      <div className="relative h-31.5 w-full">
        {/* <div className="absolute left-0 top-0 rounded-br bg-black/40 px-1.5 py-1 text-sm text-red-300">10303</div> */}
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
        </div>
        <div className="mt-2 flex gap-1.5">
          <div className="rounded-sm bg-blue/20 px-2 py-[1px] text-xs/4.5 text-blue">Online</div>
          <div className="rounded-sm bg-blue/20 px-2 py-[1px] text-xs/4.5 text-blue">v1.0.1</div>
          <div className="rounded-sm bg-blue/20 px-2 py-[1px] text-xs/4.5 text-blue">10/27/2023 11:32</div>
        </div>
        <div className="mt-3 grid grid-cols-3">
          <div>
            <div className="text-xs text-gray-300">PV</div>
            <div className="mt-1.5 text-sm/5 font-semibold">123</div>
          </div>
          <div>
            <div className="text-xs text-gray-300">DAU</div>
            <div className="mt-1.5 text-sm/5 font-semibold">123</div>
          </div>
          <div>
            <div className="text-xs text-gray-300">DNU</div>
            <div className="mt-1.5 text-sm/5 font-semibold">123</div>
          </div>
        </div>
      </div>
      <StyledButton className="h-9 w-full" variant="gradient">
        Publish
      </StyledButton>

      <div className="absolute left-0 top-0 flex items-center gap-0.5 rounded-ee-lg rounded-ss-lg bg-black/20 px-2 py-1.5 font-semibold backdrop-blur-lg">
        <div className="flex items-center gap-2 text-xs font-bold">
          No.1
          <p className="text-xs/6.5 flex items-center font-semibold text-red-300">
            <VoteIcon className="mr-1 h-3.5 w-3.5" />
            123
          </p>
        </div>
      </div>
    </div>
  );
}
