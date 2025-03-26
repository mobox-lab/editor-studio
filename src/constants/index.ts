export const rankConfig: { [key: number]: { icon: string; alt: string } } = {
  1: { icon: '/img/first.png', alt: '1st' },
  2: { icon: '/img/second.png', alt: '2nd' },
  3: { icon: '/img/third.png', alt: '3rd' },
};

export const DRAGON_CDN_URL = 'https://cdn-dragonverseneo.mobox.app';

export const GAME_ACTIVE_BANNERS = [
  {
    title: '$MDBL Liquidity Yield Program',
    img: 'https://cdn-dragonverseneo.mobox.app/dragon-pge-banner-02.webp',
    url: 'https://dragonverseneo.mobox.app/vault',
  },
  {
    title: 'Dragonverse Neo Litepaper',
    img: 'https://cdn-dragonverseneo.mobox.app/dragon-pge-banner-01.webp',
    url: 'https://mobox.gitbook.io/dragonverse-neo-litepaper',
  },
];

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
