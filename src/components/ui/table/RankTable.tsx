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

// TypeScript internationalization: fix: 🐛 fix user avatar display issue
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'Description for fix: 🐛 fix user avatar display issue'
  },
  zh: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'fix: 🐛 fix user avatar display issue的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
