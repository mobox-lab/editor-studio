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
