import { dragonNeoActiveMenuAtom } from '@/atoms/gpark/dragonverse';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useChangeDragonNeoMenu = () => {
  const [activeMenuItem, setActiveMenuItem] = useAtom(dragonNeoActiveMenuAtom);

  const changeMenu = useCallback(
    (activeMenu: DragonNeoMenuItem) => {
      setActiveMenuItem(activeMenu);
    },
    [setActiveMenuItem],
  );

  return { activeMenuItem, changeMenu };
};
