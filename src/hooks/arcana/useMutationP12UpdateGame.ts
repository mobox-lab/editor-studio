import { UpdateP12GameParams, updateP12GameInfo } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useMutationP12UpdateGame = () => {
  return useMutation({
    mutationFn: (data: UpdateP12GameParams) => updateP12GameInfo(data),
    onSuccess: ({ data }) => {
      toast.success('Update the work successfully.');
      return data;
    },
    onError: () => {
      toast.error('Update the work failed. Please try again.');
    },
  });
};
