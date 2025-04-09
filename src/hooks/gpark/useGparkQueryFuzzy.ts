import { useQuery } from '@tanstack/react-query';
import { fetchGparkQueryFuzzy } from '@/api';

export function useGparkQueryFuzzy(search: string) {
  return useQuery({
    queryKey: ['gpark_query_fuzzy', search],
    queryFn: () => fetchGparkQueryFuzzy({ name: search, pageSize: 10, pageNumber: 1 }),
    enabled: !!search,
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
