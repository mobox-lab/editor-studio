import { CheckNameParams, checkNameAvailable } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useMutationCheckName = () => {
  return useMutation({
    mutationFn: (data: CheckNameParams) => checkNameAvailable(data),
  });
};
