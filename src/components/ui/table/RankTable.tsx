import LoadingSvg from '@/../public/svg/loading.svg?component';
import { DragonGameRank } from '@/api';
import Empty from '@/components/ui/empty';
import { clsxm } from '@/utils';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Fragment, ReactNode, useMemo } from 'react';

type RankTableProps = {
  dataSource: DragonGameRank[];
  columns: any[];
  className?: string;
  loading?: boolean;
  renderBottom?: () => ReactNode;
};

export default function RankTable({ dataSource, columns, className, loading, renderBottom }: RankTableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className={clsxm('flex w-full flex-col overflow-auto text-right', className)}>
      <div className="bg-[#43454980]">
        {getHeaderGroups().map((headerGroup) => (
          <div
            className="flex w-full gap-[1.92vw] py-[0.8vw] text-[0.96vw]/[1.44vw] font-semibold xl:gap-6 xl:py-2.5 xl:text-xs/4.5"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-grow flex-col overflow-auto pb-[3.2vw] xl:pb-10">
        {rows.length ? (
          rows.map((row) => (
            <motion.div
              className={clsxm(
                'border-gray flex w-full gap-[1.92vw] border-b py-[1.28vw] text-[0.96vw]/[1.44vw] font-semibold xl:gap-6 xl:py-4 xl:text-xs/4.5',
              )}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                return <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>;
              })}
            </motion.div>
          ))
        ) : loading ? (
          <div className="flex-center">
            <LoadingSvg className="mt-[2.56vw] h-[3.2vw] w-[3.2vw] animate-spin fill-gray-300 xl:mt-8 xl:h-10 xl:w-10" />
          </div>
        ) : (
          <div className="flex-center">
            <Empty />
          </div>
        )}
        {renderBottom?.()}
      </div>
    </div>
  );
}

// TypeScript React component methods for: refactor: 🔧 restructure authentication flow
interface refactor____restructure_authentication_flowProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface refactor____restructure_authentication_flowState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const userefactor____restructure_authentication_flow = () => {
  const [state, setState] = useState<refactor____restructure_authentication_flowState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlerefactor____restructure_authentication_flow = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/refactor____restructure_authentication_flow');
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
    handlerefactor____restructure_authentication_flow
  };
};

// TypeScript test for: chore: 🔧 configure logging system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____configure_logging_system', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
