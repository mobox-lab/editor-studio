'use client';
import Link from 'next/link';
import MyGameItem from '@/app/(home)/_components/MyGameItem';
import Right from '@/../public/svg/right.svg?component';
import { useFetchEditorGameList, useFetchEditorGameListTop3 } from '@/hooks/editor/useFetchGameList';
import { useFetchRank } from '@/hooks/editor/useFetchRank';
import { rankConfig } from '@/constants';
import { openExternalLink, shortenNumber, shortenShowName } from '@/utils';
import { DEV_BADGES } from '@/constants/bages';
import { SBT_LEVEL } from '@/constants/enum';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import StyledButton from '@/components/ui/button/StyledButton';
import { useEffect, useState } from 'react';
import { DataListType } from '@/api';
import { editorGamesListAtom, editorGamesTop3ListAtom } from '@/atoms/editor';
import { useAtomValue } from 'jotai';
import Empty from '@/components/ui/empty';

export default function MyGames({ isP12User = false }: { isP12User?: boolean }) {
  const { refetch } = useFetchEditorGameList();
  const data = useAtomValue(editorGamesListAtom);

  return (
    <div className="w-full">
      {/* <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">My Games</h3>
        <Link href="/developer/games" className="text-sm">
          View all
          <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />
        </Link>
      </div> */}
      {(data?.pages.length || 0) > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {data?.pages.map((item) => {
            return (item?.dataList || []).map((game) => {
              return <MyGameItem key={game.sourceGameId} gameInfo={game} refetchGameList={refetch} />;
            });
          })}
        </div>
      ) : (
        <div className="flex-center h-[280px] border border-gray-500 bg-gray-550/10">
          <Empty />
        </div>
      )}

      {/*{!isP12User && (*/}
      {/*  <div className="mt-4 flex items-center justify-center gap-4">*/}
      {/*    <StyledButton*/}
      {/*      variant="gradient-play"*/}
      {/*      className="h-12 w-[192px] text-black"*/}
      {/*      onClick={() => openExternalLink('https://assets.p12.games/')}*/}
      {/*      disabled*/}
      {/*    >*/}
      {/*      Developer Center*/}
      {/*    </StyledButton>*/}
      {/*    <StyledButton*/}
      {/*      variant="bordered"*/}
      {/*      className="h-12 w-[192px]"*/}
      {/*      onClick={() => openExternalLink('https://arcana.p12.games/')}*/}
      {/*    >*/}
      {/*      Arcana*/}
      {/*    </StyledButton>*/}
      {/*  </div>*/}
      {/*)}*/}

      {/*<div className="mt-6 grid min-h-[120px] grid-cols-2 divide-x divide-gray-500">*/}
      {/*  <div className="pr-4">*/}
      {/*    <div className="flex items-center text-xs text-gray-300">*/}
      {/*      <div className="w-10">NO.</div>*/}
      {/*      <div className={clsx('w-30', { 'w-40': !isP12User })}>Name</div>*/}
      {/*      <div className={clsx('w-24', { 'w-40': !isP12User })}>Level</div>*/}
      {/*      <div className="w-12 text-right">Games</div>*/}
      {/*      <div className="flex-1 text-right">PL</div>*/}
      {/*    </div>*/}
      {/*    {firstThree.map((item, index) => {*/}
      {/*      const { icon, alt } = rankConfig?.[index + 1] ?? {};*/}
      {/*      const realShowName = shortenShowName(item.arcanaPower?.showName ?? item.walletAddress, 14);*/}
      {/*      const devNft = item.p12GenesisNFT.find((o) => o.nftType === 'developer');*/}
      {/*      return (*/}
      {/*        <div className="mt-3 flex items-center text-sm" key={item.walletAddress}>*/}
      {/*          <div className="w-10">*/}
      {/*            <img src={icon} alt={alt} className="h-6 w-6" />*/}
      {/*          </div>*/}
      {/*          <div className={clsx('w-30 font-medium', { 'w-40': !isP12User })}>{realShowName}</div>*/}
      {/*          <div className={clsx('w-24 font-medium', { 'w-40': !isP12User })}>*/}
      {/*            {devNft ? (*/}
      {/*              <div className="flex items-center gap-1">*/}
      {/*                <img src={DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.img} className="h-5 w-5" alt="nft" />*/}
      {/*                <div className={twMerge(clsx('font-semibold'), DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.color)}>*/}
      {/*                  {DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.rarity?.toUpperCase()}*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            ) : (*/}
      {/*              '--'*/}
      {/*            )}*/}
      {/*          </div>*/}
      {/*          <div className="w-12 text-right font-semibold">{item._count.arcanaGames}</div>*/}
      {/*          <div className="flex-1 text-right font-semibold">{shortenNumber(item?.developerPower ?? 0)}</div>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}

      {/*  <div className="pl-4">*/}
      {/*    <div className="flex text-xs text-gray-300">*/}
      {/*      <div className={clsx('w-10')}>NO.</div>*/}
      {/*      <div className={clsx('w-30', { 'w-40': !isP12User })}>Name</div>*/}
      {/*      <div className={clsx('w-24', { 'w-40': !isP12User })}>Level</div>*/}
      {/*      <div className="w-12 text-right">Games</div>*/}
      {/*      <div className="flex-1 pr-2 text-right">PL</div>*/}
      {/*    </div>*/}
      {/*    <div className="mt-3 max-h-[100px] overflow-auto">*/}
      {/*      {rest.map((item, index) => {*/}
      {/*        const realShowName = shortenShowName(item.arcanaPower?.showName ?? item.walletAddress, 14);*/}
      {/*        const devNft = item.p12GenesisNFT.find((o) => o.nftType === 'developer');*/}
      {/*        return (*/}
      {/*          <div className="mb-3 flex items-center text-sm" key={item.walletAddress}>*/}
      {/*            <div className="w-10 font-semibold leading-6">{index + 4}</div>*/}
      {/*            <div className={clsx('w-30 font-medium', { 'w-40': !isP12User })}>{realShowName}</div>*/}
      {/*            <div className={clsx('w-24 font-medium', { 'w-40': !isP12User })}>*/}
      {/*              {devNft ? (*/}
      {/*                <div className="flex items-center gap-1">*/}
      {/*                  <img src={DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.img} className="h-5 w-5" alt="nft" />*/}
      {/*                  <div className={twMerge(clsx('font-semibold'), DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.color)}>*/}
      {/*                    {DEV_BADGES[devNft?.nftLevel as SBT_LEVEL]?.rarity?.toUpperCase()}*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              ) : (*/}
      {/*                '--'*/}
      {/*              )}*/}
      {/*            </div>*/}
      {/*            <div className="w-12 text-right font-semibold">{item._count.arcanaGames}</div>*/}
      {/*            <div className="flex-1 pr-2 text-right font-semibold">{shortenNumber(item?.developerPower ?? 0)}</div>*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

// TypeScript utility function: fix: 🐛 fix game loading screen stuck
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____fix_game_loading_screen_stuck: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript internationalization: test: 🧪 add error handling tests
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    test____add_error_handling_tests: 'test: 🧪 add error handling tests',
    test____add_error_handling_tests_description: 'Description for test: 🧪 add error handling tests'
  },
  zh: {
    test____add_error_handling_tests: 'test: 🧪 add error handling tests',
    test____add_error_handling_tests_description: 'test: 🧪 add error handling tests的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
