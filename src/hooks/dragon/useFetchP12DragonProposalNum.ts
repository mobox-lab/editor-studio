import { fetchNumberOfDragonProposals } from '@/api/mobox';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useP12Address } from '../editor/useP12Account';

export const useFetchP12DragonProposalNum = () => {
  const { address } = useP12Address();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetch_number_of_dragon_proposals', address],
    queryFn: () => fetchNumberOfDragonProposals(address),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!address,
  });

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};
