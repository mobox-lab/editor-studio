import { useMutationP12UploadGameImage } from '@/hooks/category/useMutationP12UploadGameImage';
import { ChangeEvent, Ref, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

interface ImageSelectorProps {
  name?: string;
  className?: string;
  itemClass?: string;
  defaultImages?: string[];
  maxSize?: number;
  images: string[];
  onChange: (images: string[]) => void;
}
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3M in bytes

const ImageSelector = forwardRef(
  (
    { name, className, itemClass, defaultImages, images, onChange, maxSize = MAX_IMAGE_SIZE }: ImageSelectorProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync } = useMutationP12UploadGameImage();
    const handleImageChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).filter((file) => {
            if (file.size > MAX_IMAGE_SIZE) {
              toast.error('File size too large than 3M. Please upload again.');
              return false;
            }
            return true;
          });
          try {
            const res = await Promise.all(filesArray.map((file) => mutateAsync(file)));
            const urls = res.map(({ data }) => 'https://cdn1.p12.games/' + data);
            onChange([...images, ...urls]);
          } catch (e) {
            console.log(e);
          }
        }
      },
      [images, mutateAsync, onChange],
    );

    const handleRemoveImage = (index: number) => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      onChange(updatedImages);
    };
    // 使用useImperativeHandle来同步内部ref和外部ref
    useImperativeHandle(ref, () => fileInputRef.current!);

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className={twMerge('flex flex-wrap items-center gap-3', className)}>
        {defaultImages?.length
          ? defaultImages.map((url) => (
              <div key={url} className={twMerge('relative h-32 w-32 rounded-sm bg-white/[0.12]', itemClass)}>
                <img src={url} alt={url} className="h-full w-full rounded-sm object-cover" />
              </div>
            ))
          : null}
        {images.map((url, index) => (
          <div key={index} className={twMerge('relative h-32 w-32 rounded-sm bg-white/[0.12]', itemClass)}>
            <img src={url} alt={url} className="h-full w-full rounded-sm object-cover" />
            <img
              className="absolute -right-2.5 -top-2.5 h-5 w-5 cursor-pointer"
              alt="close"
              src="/svg/error.svg"
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}
        <input type="file" name={name} ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        {(images?.length ?? 0) < 5 && (
          <div
            className="text-[1.625rem]/6.5 flex h-[4.5rem] w-[7.875rem] cursor-pointer items-center justify-center rounded-sm bg-white/[0.12] font-semibold"
            onClick={triggerFileInput}
          >
            +
          </div>
        )}
      </div>
    );
  },
);
ImageSelector.displayName = 'ImageSelector';
export default ImageSelector;
