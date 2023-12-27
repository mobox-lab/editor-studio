import { uploadP12Image } from '@/api';
import { sendEvent } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useMutationP12UploadGameImage = () => {
  return useMutation({
    mutationFn: uploadP12Image,
    onSuccess: (data) => {
      toast.success('Image uploaded successfully.');
      sendEvent('ed_edit_upload_img', '编辑游戏：上传5图', { result: 1 });
    },
    onError: (error) => {
      toast.error(`Image upload failed.`);
      sendEvent('ed_edit_upload_img', '编辑游戏：上传5图', { result: 0 });
    },
  });
};
