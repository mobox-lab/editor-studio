import { GparkUserInfoParams, updateGparkUserInfo } from '@/api';
import { useMutation } from '@tanstack/react-query';

export function useMutationEditGparkUserInfo() {
  return useMutation({
    mutationFn: (data?: GparkUserInfoParams) => updateGparkUserInfo(data),
  });
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
