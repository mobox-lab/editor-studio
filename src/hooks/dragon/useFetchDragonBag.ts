import { useQuery } from '@tanstack/react-query';
import { fetchDragonUserBag } from '@/api/mobox';

export function useFetchDragonBag({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_dragon_bad', address],
    queryFn: () => fetchDragonUserBag(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript utility function: fix: 🐛 correct interface property types
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

export const fix____correct_interface_property_types: UtilityFunctions = {
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
