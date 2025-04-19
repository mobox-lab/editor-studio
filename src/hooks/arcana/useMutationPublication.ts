import { Address } from 'viem';
import { useMutation } from '@tanstack/react-query';
import { fetchIsPublication, fetchPublishGame, PublishGame } from '@/api';

export const useMutationIsPublication = () => {
  return useMutation({
    mutationFn: (address?: Address) => fetchIsPublication(address),
    onSuccess: ({ data }) => {
      return data;
    },
  });
};

export function useMutationPublishGame() {
  return useMutation({
    mutationFn(data: PublishGame) {
      return fetchPublishGame(data);
    }
  });
}
// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
