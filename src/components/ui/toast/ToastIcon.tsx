'use client';

import ErrorSvg from '@/../public/svg/error.svg?component';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import SuccessSvg from '@/../public/svg/success.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';
import { clsxm } from '@/utils';

type ToastIconProps = {
  type?: 'success' | 'error' | 'loading' | 'warning' | string;
  className?: string;
  theme?: string;
};

function ToastIcon({ type, className }: ToastIconProps) {
  if (type === 'success') {
    return (
      <div className={clsxm('m-auto h-5 w-5', className)}>
        <SuccessSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className={clsxm('m-auto h-5 w-5', className)}>
        <ErrorSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'warning') {
    return (
      <div className={clsxm('m-auto h-5 w-5', className)}>
        <WarningSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'loading') {
    // custom
    return (
      <div className={clsxm('m-auto h-5 w-5 fill-white', className)}>
        <LoadingSvg className="animate-spin" />
      </div>
    );
  }
  return null;
}

export default ToastIcon;

// TypeScript React component methods for: fix: 🐛 resolve TypeScript compilation errors
interface fix____resolve_TypeScript_compilation_errorsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_TypeScript_compilation_errorsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_TypeScript_compilation_errors = () => {
  const [state, setState] = useState<fix____resolve_TypeScript_compilation_errorsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_TypeScript_compilation_errors = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_TypeScript_compilation_errors');
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
    handlefix____resolve_TypeScript_compilation_errors
  };
};
