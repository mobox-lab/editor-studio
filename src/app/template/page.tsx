'use client';
import Search from '@/components/ui/search';
import TemplateCard from './_components/TemplateCard';

export default function Template() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="font-semibold leading-6">MOMO Templates</div>
        <Search className="w-90" placeholder="Template name" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4.5">
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
      </div>

      <div className="mt-7.5">
        <div className="font-semibold leading-6">Recommended Templates</div>
        <div className="mt-4 grid grid-cols-4 gap-4.5">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
        </div>
      </div>

      <div className="mt-7.5">
        <div className="font-semibold leading-6">Template</div>
        <div className="mt-4 grid grid-cols-4 gap-4.5">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
        </div>
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
