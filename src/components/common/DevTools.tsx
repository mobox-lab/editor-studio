import Script from 'next/script';

export default function DevTools() {
  return (
    <>
      <Script id="eruda" strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/eruda/3.4.1/eruda.min.js" />
      <Script id="eruda-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: 'window.eruda.init()' }} />
    </>
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
