import { ChangeEvent, Ref, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useMutationP12UploadGameImage } from '@/hooks/category/useMutationP12UploadGameImage';
import { clsxm } from '@/utils';

interface Size {
  width?: number;
  height?: number;
}

interface ImageSelectorProps {
  name?: string;
  className?: string;
  itemClass?: string;
  buttonClass?: string;
  defaultImages?: string[];
  maxFileSize?: number;
  maxLength?: number;
  images: string[];
  minSize?: Size;
  maxSize?: Size;
  ratio?: number;
  onChange: (images: string[]) => void;
}

const MB = 1024 * 1024;
const MAX_IMAGE_SIZE = 3 * MB; // 3M in bytes

function getImageSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      // 设置图片的源
      img.src = event.target?.result as string;
    };

    // 读取文件
    reader.readAsDataURL(file);
  });
}

const ImageSelector = forwardRef(
  (
    {
      name,
      className,
      itemClass,
      buttonClass,
      defaultImages,
      images,
      onChange,
      maxFileSize = MAX_IMAGE_SIZE,
      minSize,
      maxSize,
      ratio,
      maxLength = Number.MAX_VALUE,
    }: ImageSelectorProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    // const { mutateAsync } = useMutationUploadGameImage();
    const { mutateAsync } = useMutationP12UploadGameImage();
    const imageLength = useMemo(() => (defaultImages?.length ?? 0) + (images.length ?? 0), [images, defaultImages]);
    const handleImageChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).filter((file) => {
            if (file.size > maxFileSize) {
              toast.error(`File size too large than ${maxFileSize / MB}M. Please upload again.`);
              return false;
            }

            return true;
          });

          let files: File[] = [];

          if (minSize || maxSize || ratio) {
            for (let item of filesArray) {
              const size = await getImageSize(item);

              // Maximum size limit
              if (maxSize) {
                if (
                  size.width >= (maxSize!.width || Number.MIN_VALUE) ||
                  size.height >= (maxSize!.height ?? Number.MIN_VALUE)
                ) {
                  toast.error('Image resolution error');
                  continue;
                }
              }

              // Minimum size limit
              if (minSize) {
                if (size.width < (minSize!.width || 0) || size.height < (minSize!.height ?? 0)) {
                  toast.error('Image resolution error');
                  continue;
                }
              }

              // Proportional limitations
              if (ratio && parseFloat((size.width / size.height).toFixed(3)) != parseFloat(ratio.toFixed(3))) {
                toast.error('Image scale error');
                continue;
              }

              files.push(item);
            }
          } else {
            files = filesArray;
          }

          try {
            const res = await Promise.all(files.map((file) => mutateAsync(file)));
            const urls = res.map(({ data }) => 'https://cdn1.p12.games/' + data);
            onChange([...images, ...urls]);
          } catch (e) {
          }

          e.target.value = '';
        }
      },
      [images, minSize, maxSize, maxFileSize, ratio, maxLength, mutateAsync, onChange],
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
              <div key={url} className={twMerge('relative h-32 w-32 rounded-lg bg-white/[0.12]', itemClass)}>
                <img src={url} alt={url} className="h-full w-full rounded-lg object-cover" />
              </div>
            ))
          : null}
        {images.map((url, index) => (
          <div key={index} className={twMerge('relative h-32 w-32 rounded-lg bg-white/[0.12]', itemClass)}>
            <img src={url} alt={url} className="h-full w-full rounded-lg object-cover" />
            <img
              className="absolute -right-3 -top-3 h-6 w-6 cursor-pointer"
              alt="close"
              src="/svg/error.svg"
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}
        <input type="file" name={name} ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        {imageLength < maxLength && (
          <div
            className={clsxm(
              'text-[1.625rem]/6.5 flex h-[4.5rem] w-[7.875rem] cursor-pointer items-center justify-center rounded-lg bg-white/[0.12] font-semibold',
              buttonClass,
            )}
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: style: 💄 add hover effects
interface style____add_hover_effectsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface style____add_hover_effectsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usestyle____add_hover_effects = () => {
  const [state, setState] = useState<style____add_hover_effectsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlestyle____add_hover_effects = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/style____add_hover_effects');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlestyle____add_hover_effects
  };
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
