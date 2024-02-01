import { useQuery } from '@tanstack/react-query';
import { fetchDragonUserBag } from '@/api/mobox';

export function useFetchDragonBag({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_dragon_bad', address],
    queryFn: () => fetchDragonUserBag(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}
