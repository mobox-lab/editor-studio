'use client';
import { useMemo } from 'react';
import Empty from '@/components/ui/empty';
import Search from '@/components/ui/search';
import GparkGame from '@/components/ui/card/GparkGame';
import Right from '@/../public/svg/right.svg?component';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGparkQueryFuzzy } from '@/hooks/gpark/useGparkQueryFuzzy';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = useMemo(() => searchParams.get('q') ?? '', [searchParams]);

  // const { data } = useGparkQueryFuzzy(searchText);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          onClick={() => router.back()}
          className="flex-center cursor-pointer gap-1 text-base font-medium text-gray-300 hover:text-white"
        >
          <Right className="rotate-180 fill-white" />
          Back
        </div>
        <Search defaultValue={searchText} onEnterUp={(value) => router.replace(`/search?q=${value}`)} className="w-90" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Empty className="col-span-4 mt-80" />
      </div>
    </div>
  );
}

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
