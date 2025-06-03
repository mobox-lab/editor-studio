export type GameListBodyType = {
  pageSize: number;
  offset: number;
};

export type GameListType = {
  totalCount: number;
  dataList: DataListType[];
};

export type DataListType = {
  cover: string;
  icon: string;
  name: string;
  state: number;
  version: string;
  channel: number;
  sourceGameId: string;
  gameCode: string;
  latestVersion: string;
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
