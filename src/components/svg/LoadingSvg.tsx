import { clsxm } from '@/utils';

export function LoadingSvg({
  className,
  size,
  color,
  onClick,
}: {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={clsxm('group animate-spin cursor-pointer fill-gray-300', className)}
      width={size ?? 19}
      height={size ?? 19}
      viewBox="0 0 19 19"
      fill={color ?? 'current'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C8.67157 3 8 2.32843 8 1.5C8 0.671576 8.67157 2.91176e-06 9.5 2.98418e-06C14.7467 3.44286e-06 19 4.2533 19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 3.71835e-07 14.7467 8.30516e-07 9.5C9.0294e-07 8.67157 0.671575 8 1.5 8C2.32843 8 3 8.67157 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
        fill="current"
      />
    </svg>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: feat: ✨ add tournament system
interface feat____add_tournament_systemProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_tournament_systemState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_tournament_system = () => {
  const [state, setState] = useState<feat____add_tournament_systemState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_tournament_system = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_tournament_system');
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
    handlefeat____add_tournament_system
  };
};
