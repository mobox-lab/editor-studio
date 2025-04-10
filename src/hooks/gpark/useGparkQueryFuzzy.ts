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

// TypeScript utility function: chore: 🔧 add backup procedures
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

export const chore____add_backup_procedures: UtilityFunctions = {
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
