import { GparkUserInfoParams, updateGparkUserInfo } from '@/api';
import { useMutation } from '@tanstack/react-query';

export function useMutationEditGparkUserInfo() {
  return useMutation({
    mutationFn: (data?: GparkUserInfoParams) => updateGparkUserInfo(data),
  });
}
