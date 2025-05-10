'use client';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import Empty from '@/components/ui/empty';
import { useSearchParams } from 'next/navigation';
import GparkGame from '@/components/ui/card/GparkGame';
import { categorySearchTextAtom } from '@/atoms/category/search';
import { useFilterSearchGames } from '@/hooks/category/useFilterSearchGames';
import { useGparkCardContentScroll } from '@/hooks/gpark/useGparkCardContentScroll';

export default function CategorySlug() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const searchText = useAtomValue(categorySearchTextAtom);
  const { data, ref, isLoading, isFetchingNextPage } = useGparkCardContentScroll(categoryId);
  const defaultLoadingList = useMemo(() => Array.from({ length: 20 }), []);
  const nextPageLoadingList = useMemo(() => Array.from({ length: 10 }), []);
  const dataList = useMemo(() => (data?.pages.map((item) => item.data?.dataList ?? []) ?? []).flat(), [data]);
  const filteredList = useFilterSearchGames(dataList, searchText);

  return (
    <div className="grid grid-cols-4 gap-4">
      {isLoading ? (
        defaultLoadingList.map((_, index) => <GparkGame isLoading key={index} />)
      ) : filteredList.length ? (
        filteredList.map((game) => <GparkGame key={game.code} data={game} />)
      ) : (
        <Empty className="col-span-4 mt-80" />
      )}
      {isFetchingNextPage && nextPageLoadingList.map((_, index) => <GparkGame isLoading key={index} />)}
      <div ref={ref} />
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
