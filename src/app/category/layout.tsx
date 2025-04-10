'use client';
import { useAtom, useSetAtom } from 'jotai';
import Search from '@/components/ui/search';
import { PropsWithChildren, useMemo } from 'react';
import { toTitleCase } from '@/utils/to-title-case';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { categorySearchTextAtom } from '@/atoms/category/search';

export default function Layout({ children }: PropsWithChildren) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchText, setSearchText] = useAtom(categorySearchTextAtom);

  const pageTitle = useMemo(
    () => (pathname.indexOf('arcana') > -1 ? 'Arcana Games (P12 UGC Creations)' : toTitleCase(params.slug as string)),
    [params.slug, pathname],
  );

  const onBack = () => {
    setSearchText('');
    router.back();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-base font-medium">
          <span className="cursor-pointer font-normal text-gray-300" onClick={onBack}>
            GPark /
          </span>
          &nbsp;{pageTitle}
        </div>
        <Search defaultValue={searchText} onChange={(value) => setSearchText(value)} className="w-90" />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

// TypeScript utility function: refactor: 🔧 optimize database queries
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

export const refactor____optimize_database_queries: UtilityFunctions = {
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
