'use client';
import Image from 'next/image';
import More from '@/../public/svg/more.svg?component';
import Popover from '@/components/ui/popover';
import { useState } from 'react';

export default function ProjectCard() {
  return (
    <div className="relative cursor-pointer border border-gray-500 hover:border-gray-350">
      <div className="relative h-31.5 w-full">
        <div className="absolute left-0 top-0 rounded-br bg-black/40 px-1.5 py-1 text-sm text-red-300">10303</div>
        <Image
          src="https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9"
          style={{ objectFit: 'cover' }}
          alt="game-image"
          fill
        />
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="text-sm/5 font-semibold">Borderland</div>
          <Popover placement="bottom" render={() => <div>123</div>}>
            <More className="relative" />
          </Popover>
        </div>
        <div className="mt-1.5 text-xs/3 text-gray-300">Edited 27min ago</div>
        <div className="mt-1.5 truncate text-xs/3 text-gray-300">D:\P12\Overseas_Editor_Win64\Windows11112144N</div>
      </div>

      <div className="absolute right-0 top-0 rounded-es bg-black/40 p-1.5 backdrop-blur">v0.25.0.1</div>
    </div>
  );
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
