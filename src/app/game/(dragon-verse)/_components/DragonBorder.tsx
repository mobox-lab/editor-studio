import { clsxm } from '@/utils';

export default function DragonBorder({ className }: { className?: string }) {
  return <div className={clsxm('border-dragon absolute inset-2', className)}></div>;
}

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
