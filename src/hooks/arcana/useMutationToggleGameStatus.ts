import { ToggleStatusParams, toggleGameStatus } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useMutationToggleGameStatus = () => {
  return useMutation({
    mutationFn: (data: ToggleStatusParams) => toggleGameStatus(data),
    onSuccess: ({ data }) => {
      return data;
    },
  });
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
