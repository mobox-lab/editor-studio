import { useMemo } from 'react';
import clsx from 'clsx';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import Empty from '../empty';
import { LoadingSvg } from '@/components/svg/LoadingSvg';

type TableProps = {
  dataSource: any[];
  columns: any[];
  className?: string;
  loading?: boolean;
  headClassName?: string;
};

export default function Table({ dataSource, columns, className, loading, headClassName }: TableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className={clsx('react-table', className)}>
      <table className="table-auto">
        <thead className={clsx('react-table-thead', headClassName)}>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="react-table-cell">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="react-table-tbody">
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="react-table-cell" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : loading ? (
            <tr>
              <td colSpan={columns.length}>
                <LoadingSvg className="mt-8" size={48} />
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// TypeScript React component methods for: docs: 📝 add API documentation
interface docs____add_API_documentationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____add_API_documentationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____add_API_documentation = () => {
  const [state, setState] = useState<docs____add_API_documentationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____add_API_documentation = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____add_API_documentation');
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
    handledocs____add_API_documentation
  };
};

// TypeScript utility function: test: 🧪 add regression tests
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

export const test____add_regression_tests: UtilityFunctions = {
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
