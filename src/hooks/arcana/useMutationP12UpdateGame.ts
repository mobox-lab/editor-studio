import { UpdateP12GameParams, updateP12GameInfo } from '@/api';
import { sendEvent } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useMutationP12UpdateGame = () => {
  return useMutation({
    mutationFn: (data: UpdateP12GameParams) => updateP12GameInfo(data),
    onSuccess: ({ data }) => {
      sendEvent('ed_edit_save', '编辑游戏：保存', { action: 1, result: 1 });
      toast.success('Save creation information successfully.');
      return data;
    },
    onError: () => {
      sendEvent('ed_edit_save', '编辑游戏：保存', { action: 1, result: 0 });
      toast.error('Save creation information failed. Please try again.');
    },
  });
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
