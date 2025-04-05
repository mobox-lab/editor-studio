import { useQuery } from '@tanstack/react-query';
import { fetchDragonUserBag } from '@/api/mobox';

export function useFetchDragonBag({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_dragon_bad', address],
    queryFn: () => fetchDragonUserBag(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
