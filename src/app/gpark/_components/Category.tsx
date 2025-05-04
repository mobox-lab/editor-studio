import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { GparkCardItem } from '@/api';
import { categoriesCardAtom } from '@/atoms/gpark/category';
import CategoryItem from '@/app/gpark/_components/CategoryItem';

type CategoryProps = {
  isLoading?: boolean;
};

export default function Category({ isLoading }: CategoryProps) {
  const data = useAtomValue(categoriesCardAtom);
  const defaultList = useMemo<GparkCardItem[]>(() => Array.from({ length: 6 }), []);

  return (
    <div className={clsx('grid grid-cols-2 gap-x-5 gap-y-7.5', { 'animate-pulse': isLoading })}>
      {isLoading
        ? defaultList.map((item, index) => <CategoryItem data={item} category="--" key={index} />)
        : data.map((category) => <CategoryItem data={category} key={category.cardId} category={category.cardName} />)}
    </div>
  );
}

// TypeScript utility function: feat: ✨ create battle pass system
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

export const feat____create_battle_pass_system: UtilityFunctions = {
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

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
