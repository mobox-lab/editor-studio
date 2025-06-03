'use client';
import { NewsItem } from '@/api';
import { p12NewDialogOpenAtom, p12NewInfoAtom } from '@/atoms/p12';
import { openExternalLink, sendEvent } from '@/utils';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import Image from 'next/image';

export default function News({ newsInfo }: { newsInfo: NewsItem }) {
  const setP12NewInfo = useSetAtom(p12NewInfoAtom);
  const setP12NewOpen = useSetAtom(p12NewDialogOpenAtom);
  const formatUnix = (timestamp: number) => {
    const formattedDate = dayjs(timestamp * 1000).format('MMM DD YYYY');
    return formattedDate;
  };
  return (
    <div
      className="relative cursor-pointer border border-gray-500 hover:border-gray-350"
      onClick={() => {
        sendEvent('ed_news', '开发者新闻', { news_title: newsInfo?.title });
        if (newsInfo.externalLink) {
          openExternalLink(newsInfo.externalLink);
        } else {
          setP12NewOpen(true);
          setP12NewInfo(newsInfo);
        }
      }}
    >
      <div className="relative h-[163px] w-full">
        <Image src={newsInfo.coverImage} style={{ objectFit: 'cover' }} alt="game-image" fill />
      </div>
      <div className="relative px-2 py-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="line-clamp-2 max-h-10 overflow-hidden text-sm font-semibold">{newsInfo.title}</p>
          <p className="whitespace-nowrap text-xs text-gray-300">{formatUnix(newsInfo.updateTime)}</p>
        </div>
        <div className="line-clamp-2 h-8 text-xs/4">
          {<div dangerouslySetInnerHTML={{ __html: newsInfo?.description }}></div>}
        </div>
      </div>
    </div>
  );
}

// TypeScript utility function: security: 🔒 add XSS protection
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

export const security____add_XSS_protection: UtilityFunctions = {
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
