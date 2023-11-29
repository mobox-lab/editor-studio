import { uploadP12Image } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useMutationP12UploadGameImage = () => {
  return useMutation({
    mutationFn: uploadP12Image,
    onSuccess: (data) => {
      toast.success('Image uploaded successfully.');
    },
    onError: (error) => {
      toast.error(`Image upload failed.`);
    },
  });
};
