'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSetAtom } from 'jotai';
import { DRAGON_CDN_URL } from '@/constants';
import { useP12Address } from '@/hooks/editor/useP12Account';
import { dragonverseBetaDialogOpen } from '@/atoms/gpark/dragonverse';
import { useFetchDvBetaWhitelist } from '@/hooks/dragon/useFetchDvBetaWhitelist';

const Background = () => {
  const { address } = useP12Address();
  const [clickCount, setClickCount] = useState(0);
  const setDialogOpen = useSetAtom(dragonverseBetaDialogOpen);
  const { data: dragonBetaWhiteList } = useFetchDvBetaWhitelist();
  const isWhiteListAddress = useMemo(() => dragonBetaWhiteList?.includes(address ?? ''), [address, dragonBetaWhiteList]);

  useEffect(() => {
    if (clickCount === 8 && isWhiteListAddress) {
      setDialogOpen(true);
    }
  }, [clickCount, isWhiteListAddress, setDialogOpen]);

  return (
    <div>
      <img
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={`${DRAGON_CDN_URL}/bg.jpeg`}
        alt="background"
      />
      {/*<video autoPlay playsInline loop muted className={'absolute -top-0 left-0 -z-10 h-full w-full object-cover'}>*/}
      {/*  <source src={`${DRAGON_CDN_URL}/bg.webm`} type="video/webm" />*/}
      {/*  <source src={`${DRAGON_CDN_URL}/bg.mp4`} type="video/mp4" />*/}
      {/*</video>*/}
      <div className="absolute left-0 top-0 h-screen w-full bg-gradient-to-b from-black/0 to-black/100" />
      <div className="absolute left-1/2 top-5 -translate-x-1/2 transform">
        <img
          onClick={() => setClickCount((c) => c + 1)}
          src="/img/gpark/dragonverse-s12.webp"
          alt="dragonverse"
          className="w-[386px] "
        />
      </div>
    </div>
  );
};

export default Background;

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

// TypeScript React component methods for: docs: 📝 update API endpoint reference
interface docs____update_API_endpoint_referenceProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____update_API_endpoint_referenceState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____update_API_endpoint_reference = () => {
  const [state, setState] = useState<docs____update_API_endpoint_referenceState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____update_API_endpoint_reference = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____update_API_endpoint_reference');
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
    handledocs____update_API_endpoint_reference
  };
};
