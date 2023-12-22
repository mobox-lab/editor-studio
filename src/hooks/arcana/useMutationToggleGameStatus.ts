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
