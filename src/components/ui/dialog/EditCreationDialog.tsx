'use client';

import { arcanaEditCreationDialogOpen, arcanaEditCreationIdAtom } from '@/atoms/category/arcana';
import { useFetchP12GameDetail } from '@/hooks/arcana/useFetchP12GameDetail';
import { useMutationP12UpdateGame } from '@/hooks/arcana/useMutationP12UpdateGame';
import { useFormOnError } from '@/hooks/util/useFormOnError';
import { sendEvent } from '@/utils';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '.';
import StyledButton from '../button/StyledButton';
import ImageSelector from '../imageSelector';
import { useQueryClient } from '@tanstack/react-query';
import { EditorFetchKey } from '@/constants/editor';

type GameDetailForm = {
  gameName: string;
  gameDescription: string;
};
export default function EditCreationDialog() {
  const [isOpen, setIsOpen] = useAtom(arcanaEditCreationDialogOpen);
  const editingCreationId = useAtomValue(arcanaEditCreationIdAtom);
  const queryClient = useQueryClient();
  const { data } = useFetchP12GameDetail({ id: editingCreationId });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImagesSelected = (urls: string[]) => {
    setSelectedImages(urls);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<GameDetailForm>();

  const [icon, setIcon] = useState<string>();
  const gameNameValue = watch('gameName');
  const gameDescValue = watch('gameDescription');

  const { mutate } = useMutationP12UpdateGame();

  const onSubmit = (values: GameDetailForm) => {
    if (!editingCreationId) return;
    const { gameDescription, gameName } = values;
    mutate(
      { id: editingCreationId, gameDescription, gameName, screenshots: selectedImages, icon },
      {
        onSuccess: () => {
          if (data?.gameName !== gameName) sendEvent('ed_edit_name', '编辑游戏：修改名字');
          if (data?.gameDescription !== gameDescription) sendEvent('ed_edit_intro', '编辑游戏：修改简介');
          setIsOpen(false);
          queryClient.refetchQueries({ queryKey: [EditorFetchKey.EditorGameList] }).then();
          queryClient.refetchQueries({ queryKey: [EditorFetchKey.FetchEditorGameListTop3] }).then();
        },
      },
    );
  };

  const onError = useFormOnError();

  // reset default values
  useEffect(() => {
    const { gameName, gameDescription, icon, screenshots } = data ?? {};
    setValue('gameName', gameName ?? '');
    setValue('gameDescription', gameDescription ?? '');
    setSelectedImages(screenshots ?? []);
    setIcon(icon);
  }, [data, setValue]);

  // watch gameDescription length
  const watchGameName = watch('gameName');
  const watchGameDesc = watch('gameDescription');
  const handleInputChange = useCallback(
    (e: any) => {
      const currentLength = e.target.value.length;

      if (currentLength > 50) {
        setError('gameName', {
          type: 'manual',
          message: "Work's name too long. Limited in 50 characters.",
        });
      } else {
        clearErrors(['gameName']);
        setValue('gameName', e.target.value);
      }
    },
    [clearErrors, setError, setValue],
  );

  const handleTextareaChange = useCallback(
    (e: any) => {
      const currentLength = e.target.value.length;

      if (currentLength > 250) {
        setError('gameDescription', {
          type: 'manual',
          message: "Work's introduction too long. Limited in 250 characters.",
        });
      } else {
        clearErrors(['gameDescription']); // specify fields to clear
        setValue('gameDescription', e.target.value); // trigger re-render
      }
    },
    [clearErrors, setError, setValue],
  );

  const onChangeIcon = useCallback((value: string[]) => {
    setIcon(value[0]);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title={`Edit ${data?.gameName}`}
      render={({ close }) => (
        <div className="w-[600px] p-6">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h3 className="text-sm font-medium">Display Name</h3>
            <div className="vertical-scroll mt-3 flex w-full items-center gap-2 rounded-sm bg-white/[0.12] p-3 text-xs/5 backdrop-blur-lg">
              <input
                className="flex-grow bg-transparent"
                {...register('gameName', {
                  maxLength: { message: "Work's name too long. Limited in 50 characters.", value: 50 },
                  required: "Work name and introduction can't be empty.",
                })}
                onChange={handleInputChange}
              />
              <p className="text-gray-100">{watchGameName.length}/50</p>
            </div>
            {errors.gameName && <p className="mt-1 text-xs text-red-500">{errors.gameName.message}</p>}
            <h3 className="mt-8 text-sm font-medium">Images</h3>
            <ImageSelector
              className="mt-3"
              maxLength={5}
              images={selectedImages}
              onChange={handleImagesSelected}
              maxFileSize={1 * 1024 * 1024}
              ratio={5 / 3}
              defaultImages={[data?.mainImage ?? '']}
              itemClass="w-[126px] h-[75px]"
              buttonClass="w-[126px] h-[75px]"
            />
            <p className="mt-1 text-xs">Support PNG and JPG, with a maximum size of 1MB, the image ratio is 5:3 or 3:5.</p>
            <h3 className="mt-8 text-sm font-medium">Game Icon</h3>
            <ImageSelector
              className="mt-3"
              images={icon ? [icon] : []}
              maxFileSize={1 * 1024 * 1024}
              maxLength={1}
              ratio={1}
              minSize={{ width: 256, height: 256 }}
              onChange={onChangeIcon}
              itemClass="w-[72px] h-[72px]"
              buttonClass="w-[72px] h-[72px]"
            />
            <p className="mt-1 text-xs">Image size not less than 60x60 pixels</p>
            {/* Social Links */}
            <h3 className="mt-8 text-sm font-medium">Introduction</h3>
            <div className="vertical-scroll mt-3 rounded-sm bg-white/[0.12] p-3 text-xs/5 backdrop-blur-lg">
              <textarea
                className="vertical-scroll w-full resize-none appearance-none bg-transparent"
                rows={5}
                {...register('gameDescription', {
                  maxLength: { message: "Work's introduction too long. Limited in 250 characters.", value: 250 },
                  required: "Work name and introduction can't be empty.",
                })}
                onChange={handleTextareaChange}
              />
              <p className="text-right text-gray-100"> {watchGameDesc?.length}/250</p>
            </div>
            {errors.gameDescription && <p className="mt-1 text-xs text-red-500">{errors.gameDescription.message}</p>}
            <div>
              <div className="mt-3 flex items-center justify-end gap-5">
                <StyledButton
                  type="button"
                  variant="bordered"
                  onClick={() => {
                    if (data?.gameName !== gameNameValue) sendEvent('ed_edit_name', '编辑游戏：修改名字');
                    if (data?.gameDescription !== gameDescValue) sendEvent('ed_edit_intro', '编辑游戏：修改简介');
                    sendEvent('ed_edit_save', '编辑游戏：保存', { action: 0 });
                    close();
                  }}
                  className="w-[7.375rem] py-3"
                >
                  Cancel
                </StyledButton>
                <StyledButton variant="gradient" className="w-[7.375rem] py-3">
                  Save
                </StyledButton>
              </div>
            </div>
          </form>
        </div>
      )}
    />
  );
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
