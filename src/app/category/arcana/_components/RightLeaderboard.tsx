import LoadingSvg from '@/../public/svg/loading.svg?component';
import { P12GameInfo } from '@/api';
import { categoryPremiumListAtom, currentEventRoundInfoAtom } from '@/atoms/category/arcana';
import ArcanaGame from '@/components/ui/card/ArcanaGame';
import Dropdown, { DropdownItem } from '@/components/ui/dropdown';
import { useFetchP12CurrentEventRound } from '@/hooks/category/useFetchP12CurrentEventRound';
import { useFetchP12PopularGameList } from '@/hooks/category/useFetchP12PopularGameList';
import { useFetchP12WeeklyGameList } from '@/hooks/category/useFetchP12WeeklyGameList';
import { useAtomValue } from 'jotai';
import _ from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function RightLeaderboard() {
  const defaultList = useMemo(() => Array.from({ length: 8 }), []);

  useFetchP12CurrentEventRound();

  const currentEventRoundInfo = useAtomValue(currentEventRoundInfoAtom);

  const [selectedRound, setSelectedRound] = useState<number | null>(currentEventRoundInfo?.eventId ?? null);
  const handleSelectItem = (item: DropdownItem | null) => {
    setSelectedRound(item?.value as number | null);
  };

  const rounds = useMemo(() => _.rangeRight(0, currentEventRoundInfo?.eventId), [currentEventRoundInfo?.eventId]);
  const isRound = useMemo(() => selectedRound !== null, [selectedRound]);

  const dropdownItems: DropdownItem[] = useMemo(() => {
    const items: DropdownItem[] = [{ label: 'Total', value: null }];
    const roundItems = rounds.map((round) => ({ label: `Round ${round + 1}`, value: round + 1 }));
    return items.concat(roundItems);
  }, [rounds]);

  useEffect(() => {
    setSelectedRound(currentEventRoundInfo?.eventId ?? null);
  }, [currentEventRoundInfo?.eventId]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    data: popularData,
    isLoading: popularIsLoading,
    fetchNextPage: popularFetchNextPage,
    hasNextPage: popularHasNextPage,
    isFetchingNextPage: popularIsFetchingNextPage,
  } = useFetchP12PopularGameList();
  const {
    data: weekData,
    isLoading: weekIsLoading,
    fetchNextPage: weekFetchNextPage,
    hasNextPage: weekHasNextPage,
    isFetchingNextPage: weekIsFetchingNextPage,
  } = useFetchP12WeeklyGameList(selectedRound as number | null);

  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMemo(() => {
    if (isRound)
      return {
        hasNextPage: weekHasNextPage,
        isLoading: weekIsLoading,
        fetchNextPage: weekFetchNextPage,
        isFetchingNextPage: weekIsFetchingNextPage,
      };
    return {
      hasNextPage: popularHasNextPage,
      isLoading: popularIsLoading,
      fetchNextPage: popularFetchNextPage,
      isFetchingNextPage: popularIsFetchingNextPage,
    };
  }, [
    isRound,
    popularFetchNextPage,
    popularHasNextPage,
    popularIsFetchingNextPage,
    popularIsLoading,
    weekFetchNextPage,
    weekHasNextPage,
    weekIsFetchingNextPage,
    weekIsLoading,
  ]);

  const weekItems = useMemo(() => {
    if (weekData?.pages?.length && weekData.pages[0]?.length) {
      const res = weekData.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [weekData?.pages]);

  const popularItems = useMemo(() => {
    if (popularData?.pages?.length && popularData.pages[0]?.length) {
      const res = popularData.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [popularData]);

  const premiumData = useAtomValue(categoryPremiumListAtom);

  const items = useMemo(() => {
    if (isRound) return weekItems;
    return popularItems;
  }, [isRound, popularItems, weekItems]);

  const [premiumItems, setPremiumItems] = useState<P12GameInfo[]>([]);
  useEffect(() => {
    setPremiumItems(_.shuffle(premiumData));
  }, [premiumData]);

  const { ref, inView: inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  const needFill = useMemo(
    () => !weekHasNextPage && isRound && selectedRound === currentEventRoundInfo?.eventId && premiumItems?.length,
    [currentEventRoundInfo?.eventId, isRound, premiumItems?.length, selectedRound, weekHasNextPage],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-gray-800">
        Leaderboard
        <Dropdown items={dropdownItems} selectedValue={selectedRound} onSelectItem={handleSelectItem} />
      </div>
      <div ref={scrollRef} className="grid grid-cols-2 gap-4">
        {isLoading
          ? defaultList.map((item, i) => <ArcanaGame key={i} isLoading />)
          : items?.length
            ? items.map((item) => <ArcanaGame showWeekInfo={isRound} data={item} key={item.id} />)
            : null}
        {needFill // use selected when current round
          ? premiumItems.map((item) => (item?.weeklyRank ? null : <ArcanaGame data={item} key={'total_' + item.id} />))
          : null}
        <div ref={ref} />
        {isFetchingNextPage && <LoadingSvg className="animate-spin" />}
      </div>
    </div>
  );
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
