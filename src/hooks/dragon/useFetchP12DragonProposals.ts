import { fetchActiveDragonProposals, fetchAllDragonProposals, fetchExecuteDragonProposals } from '@/api';
import { DragonProposalSortField } from '@/constants/enum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

function getKey(sortField?: DragonProposalSortField) {
  switch (sortField) {
    case DragonProposalSortField.ACTIVE_PROPOSALS:
      return 'fetch_active_dragon_proposals';
    case DragonProposalSortField.EXECUTED_PROPOSALS:
      return 'fetch_execute_dragon_proposals';
    default:
      return 'fetch_all_dragon_proposals';
  }
}
export const useFetchP12DragonProposals = (sortField?: DragonProposalSortField) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [getKey(sortField), sortField],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      let res;
      switch (sortField) {
        case DragonProposalSortField.ACTIVE_PROPOSALS:
          res = await fetchActiveDragonProposals({ page: pageParam + 1, size: 16 });
          break;
        case DragonProposalSortField.EXECUTED_PROPOSALS:
          res = await fetchExecuteDragonProposals({ page: pageParam + 1, size: 16 });
          break;
        default:
          res = await fetchAllDragonProposals({ page: pageParam + 1, size: 16 });
          break;
      }
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 16) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );
};
