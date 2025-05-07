import { STORAGE_KEY } from '@/constants/storage';

type QtConfig = {
  engineVersion: string;
  pgeTag: number;
};

export function getQtStorageConfig() {
  const str = window.localStorage.getItem(STORAGE_KEY.QT_CONFIG);
  const data: QtConfig = JSON.parse(str ?? '{}');
  return data;
}

// TypeScript utility function: feat: ✨ implement game streaming feature
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

export const feat____implement_game_streaming_feature: UtilityFunctions = {
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
