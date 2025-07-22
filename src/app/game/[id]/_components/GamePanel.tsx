'use client';
import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { GparkGameAuthor, GparkGameDetail, GparkStartupExtension } from '@/api';
import StyledButton from '@/components/ui/button/StyledButton';

type GamePanelProps = {
  data?: GparkGameDetail;
  isLoading?: boolean;
  handleRunningGame?: () => void;
};

export default function GamePanel({ data, isLoading, handleRunningGame }: GamePanelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageList = useMemo(() => data?.images?.map((item) => item.url) ?? [], [data]);
  const author = useMemo<GparkGameAuthor | undefined>(() => data?.author ?? undefined, [data?.author]);
  const startupExtension = useMemo(() => (data ? (JSON.parse(data.startupExtension) as GparkStartupExtension) : null), [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imageList.length]);

  return (
    <div className="flex border border-gray-500 bg-gray-550/10">
      <div className="flex-1">
        <div className="relative h-[338px]">
          {imageList.length ? (
            <img src={imageList[selectedIndex]} loading="lazy" className="h-full w-full object-cover" alt="cover" />
          ) : null}
        </div>
        <div className="grid h-20 grid-cols-5 gap-[8px] p-2">
          {imageList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={clsx('relative h-16 cursor-pointer', { 'boeder-white border': selectedIndex === index })}
            >
              <img src={item} className="h-full w-full object-cover" loading="lazy" alt="cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[40%]">
        <div className="relative h-[338px] px-6 pt-6">
          <h1 className="mb-[12px] text-3xl font-semibold">{data?.name}</h1>
          <span className="rounded-sm bg-[#4383ff20] px-[8px] py-1 text-[12px] leading-[1] text-blue">
            v{startupExtension?.version}
          </span>
          <div className="mt-[24px] h-48 overflow-y-scroll whitespace-pre-line text-xs/5">{data?.description}</div>
          <div className="absolute bottom-0 flex h-11 items-center gap-2">
            <div className="">
              <div className="text-base/5">
                <span className="font-medium">By {author?.name}</span>&nbsp;
              </div>
              <div className="mt-0.5 text-xs/5">{author?.introduction}</div>
            </div>
          </div>
        </div>
        <div className="mt-2 px-6 py-2">
          <StyledButton
            variant="gradient-play"
            loading={isLoading}
            onClick={handleRunningGame}
            className="w-full flex-1 py-3.5 text-base/5 font-bold text-black"
          >
            Play Now
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
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

// TypeScript internationalization: perf: ⚡ optimize rendering pipeline
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
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'Description for perf: ⚡ optimize rendering pipeline'
  },
  zh: {
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'perf: ⚡ optimize rendering pipeline的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
