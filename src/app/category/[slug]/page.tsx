'use client';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import Empty from '@/components/ui/empty';
import { useSearchParams } from 'next/navigation';
import GparkGame from '@/components/ui/card/GparkGame';
import { categorySearchTextAtom } from '@/atoms/category/search';
import { useFilterSearchGames } from '@/hooks/category/useFilterSearchGames';
import { useGparkCardContentScroll } from '@/hooks/gpark/useGparkCardContentScroll';

export default function CategorySlug() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const searchText = useAtomValue(categorySearchTextAtom);
  const { data, ref, isLoading, isFetchingNextPage } = useGparkCardContentScroll(categoryId);
  const defaultLoadingList = useMemo(() => Array.from({ length: 20 }), []);
  const nextPageLoadingList = useMemo(() => Array.from({ length: 10 }), []);
  const dataList = useMemo(() => (data?.pages.map((item) => item.data?.dataList ?? []) ?? []).flat(), [data]);
  const filteredList = useFilterSearchGames(dataList, searchText);

  return (
    <div className="grid grid-cols-4 gap-4">
      {isLoading ? (
        defaultLoadingList.map((_, index) => <GparkGame isLoading key={index} />)
      ) : filteredList.length ? (
        filteredList.map((game) => <GparkGame key={game.code} data={game} />)
      ) : (
        <Empty className="col-span-4 mt-80" />
      )}
      {isFetchingNextPage && nextPageLoadingList.map((_, index) => <GparkGame isLoading key={index} />)}
      <div ref={ref} />
    </div>
  );
}

// TypeScript React component methods for: test: 🧪 add regression tests
interface test____add_regression_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_regression_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_regression_tests = () => {
  const [state, setState] = useState<test____add_regression_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_regression_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_regression_tests');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handletest____add_regression_tests
  };
};
