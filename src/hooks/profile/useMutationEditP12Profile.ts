import { P12ProfileParams, editProfileData } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useMutationEditP12Profile = () => {
  return useMutation({
    mutationFn: (data: P12ProfileParams) => editProfileData(data),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        return data;
      }
    },
  });
};
