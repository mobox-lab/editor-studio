import { updateP12ChainNames } from '@/api';
import { p12ProfileAtom } from '@/atoms/profile';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

export const useMutationP12UpdateChainNames = () => {
  const [profile, setUserProfile] = useAtom(p12ProfileAtom);
  return useMutation({
    mutationFn: () => updateP12ChainNames(),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        toast.success('Synchronize successfully');
        if (data) setUserProfile({ ...(profile ?? {}), ...data });
        return data;
      }
      toast.error('Synchronize failed. Please try again.');
    },
    onError: () => {
      toast.error('Synchronize failed. Please try again.');
    },
  });
};
