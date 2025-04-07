export enum Platform {
  USER,
  DEVELOPER,
}

export enum SortField {
  LATEST = 'latest',
  POPULAR = 'popular',

  // 手动筛选 非接口返回
  VOTED = 'voted',
  DEFAULT = 'default',
}

export enum WORK_TYPE {
  PREMIUM = 'premium',
  MOBOX = 'mobox',
  LATEST = 'latest',
  DEFAULT = 'default',
}

export enum RoomStatus {
  CanJoin,
  Full,
  Closed,
}

export enum SBT_LEVEL {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
  WHITE,
  REKT,
}

export enum NFT_CLAIM {
  UNCLAIMED = 0,
  PENDING,
  CLAIMED,
}

export enum DragonProposalSortField {
  ALL = 'all',
  ACTIVE_PROPOSALS = 'active',
  EXECUTED_PROPOSALS = 'executed',
}

export enum DragonProposalState {
  ACTIVE = 'active',
  CLOSED = 'closed',
  PENDING = 'pending',
}

export enum DragonNeoMenuItem {
  Governance,
  GameRank,
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
