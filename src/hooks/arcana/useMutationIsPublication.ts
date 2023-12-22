import { fetchIsPublication } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { Address } from 'viem';

export const useMutationIsPublication = () => {
  return useMutation({
    mutationFn: (address?: Address) => fetchIsPublication(address),
    onSuccess: ({ data }) => {
      return data;
    },
  });
};
