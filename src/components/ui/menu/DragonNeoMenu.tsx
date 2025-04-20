'use client';
import ActiveSvg from '@/../public/svg/active.svg?component';
import Governance from '@/../public/svg/menu-governance.svg?component';
import RankSvg from '@/../public/svg/rank.svg?component';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useChangeDragonNeoMenu } from '@/hooks/dragon/useChangeDragonNeoMenu';
import { clsxm } from '@/utils';
import clsx from 'clsx';

export function DragonNeoMenu({ className }: { className?: string }) {
  const { activeMenuItem, changeMenu } = useChangeDragonNeoMenu();

  return (
    <div className={clsxm('flex-center sticky top-0 z-10 -mx-44 h-[60px] gap-10 bg-[#1c1e29]/60 backdrop-blur-2xl', className)}>
      <div className="relative cursor-pointer" onClick={() => changeMenu(DragonNeoMenuItem.Governance)}>
        <div className="flex items-center gap-2">
          {activeMenuItem === DragonNeoMenuItem.Governance && <ActiveSvg className="w-4.5" />}
          <Governance
            className={clsx('w-5 fill-gray-300 stroke-gray-300', {
              'w-6 fill-white stroke-white': activeMenuItem === DragonNeoMenuItem.Governance,
            })}
          />
          <div
            className={clsx('text-base/4 font-medium text-gray-300', {
              'text-lg/4.5 text-white': activeMenuItem === DragonNeoMenuItem.Governance,
            })}
          >
            Governance
          </div>
        </div>
      </div>
      <div className="relative cursor-pointer" onClick={() => changeMenu(DragonNeoMenuItem.GameRank)}>
        <div className="flex items-center gap-2">
          {activeMenuItem === DragonNeoMenuItem.GameRank && <ActiveSvg className="w-4.5" />}
          <RankSvg
            className={clsx('h-5 w-5 fill-gray-300 stroke-gray-300', {
              'h-6 w-6 fill-white': activeMenuItem === DragonNeoMenuItem.GameRank,
            })}
          />
          <div
            className={clsx('text-base/4 font-medium text-gray-300', {
              'text-lg/4.5 text-white': activeMenuItem === DragonNeoMenuItem.GameRank,
            })}
          >
            Hall of Fame
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
