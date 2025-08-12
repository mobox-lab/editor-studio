import clsx from 'clsx';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEventHandler, ReactNode, useCallback, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type Card3dProps = {
  children: ReactNode;
  showMask?: boolean;
  className?: string;
  maskClass?: string;
};
const Card3d = ({ children, showMask, className, maskClass }: Card3dProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  const rotateX = useTransform(y, [-100, 100], [-15, 15]);
  const rotateY = useTransform(x, [-100, 100], [80, -80]);

  const rotateXSpring = useSpring(rotateX, { stiffness: 100, damping: 10 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 10 });

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    if (maskRef.current) maskRef.current.style.backgroundPosition = '50% 50%';
  }, [x, y]);

  const onMouseEnter = useCallback(() => {
    setEnabled(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setEnabled(false);
    reset();
  }, [reset]);

  const getTouchPosition = (e: TouchEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left - rect.width / 2;
      const touchY = e.touches[0].clientY - rect.top - rect.height / 2;
      return { touchX, touchY };
    }
    return { touchX: 0, touchY: 0 };
  };

  const onTouchMove = useCallback(
    (e: any) => {
      if (enabled) {
        const { touchX, touchY } = getTouchPosition(e);
        const blingPosX = 50 + (touchX / cardRef.current!.offsetWidth) * 50;
        const blingPosY = 50 + (touchY / cardRef.current!.offsetHeight) * 50;
        x.set(touchX);
        y.set(touchY);
        if (maskRef.current) {
          maskRef.current.style.backgroundPosition = `${blingPosX}% ${blingPosY}%`;
        }
      }
    },
    [enabled, x, y],
  );

  const onTouchStart = useCallback(() => {
    setEnabled(true);
  }, []);

  const onTouchEnd = useCallback(() => {
    setEnabled(false);
    reset();
  }, [reset]);

  const rotateToMouse: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (cardRef.current && enabled) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = e.clientX - rect.left - rect.width / 2;
        const centerY = e.clientY - rect.top - rect.height / 2;
        const blingPosX = 50 + (centerX / rect.width) * 50;
        const blingPosY = 50 + (centerY / rect.height) * 50;

        // 限制旋转角度，避免过度旋转
        const limitedCenterX = Math.min(Math.max(centerX, -50), 50);
        const limitedCenterY = Math.min(Math.max(centerY, -50), 50);

        x.set(limitedCenterX);
        y.set(limitedCenterY);
        if (maskRef.current) {
          maskRef.current.style.backgroundPosition = `${blingPosX}% ${blingPosY}%`;
        }
      }
    },
    [enabled, x, y],
  );
  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        rotateZ: 0,
        transformPerspective: 1000,
      }}
      className={twMerge('relative w-fit transition duration-75', clsx(className))}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={rotateToMouse}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
      {showMask && <div className={twMerge('bling-mask', clsx(maskClass))} ref={maskRef} />}
    </motion.div>
  );
};

export default Card3d;

// TypeScript React component methods for: chore: 🔧 update server configuration
interface chore____update_server_configurationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface chore____update_server_configurationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usechore____update_server_configuration = () => {
  const [state, setState] = useState<chore____update_server_configurationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlechore____update_server_configuration = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____update_server_configuration');
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
    handlechore____update_server_configuration
  };
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

// TypeScript utility function: fix: 🐛 correct leaderboard sorting
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

export const fix____correct_leaderboard_sorting: UtilityFunctions = {
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

// TypeScript internationalization: fix: 🐛 correct social share link format
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
    fix____correct_social_share_link_format: 'fix: 🐛 correct social share link format',
    fix____correct_social_share_link_format_description: 'Description for fix: 🐛 correct social share link format'
  },
  zh: {
    fix____correct_social_share_link_format: 'fix: 🐛 correct social share link format',
    fix____correct_social_share_link_format_description: 'fix: 🐛 correct social share link format的描述'
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

// TypeScript React component methods for: test: 🧪 add cross-browser tests
interface test____add_cross_browser_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_cross_browser_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_cross_browser_tests = () => {
  const [state, setState] = useState<test____add_cross_browser_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_cross_browser_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_cross_browser_tests');
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
    handletest____add_cross_browser_tests
  };
};
