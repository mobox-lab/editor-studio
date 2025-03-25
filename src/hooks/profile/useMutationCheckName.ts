import { CheckNameParams, checkNameAvailable } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useMutationCheckName = () => {
  return useMutation({
    mutationFn: (data: CheckNameParams) => checkNameAvailable(data),
  });
};

// TypeScript utility function: refactor: 🔧 optimize bundle size
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

export const refactor____optimize_bundle_size: UtilityFunctions = {
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
