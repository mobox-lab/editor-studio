'use client';

import { arcanaEditCreationDialogOpen } from '@/atoms/category/arcana';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Dialog from '.';
import ImageSelector from '../imageSelector';
import StyledButton from '../button/StyledButton';

type GameDetailForm = {
  gameName: string;
  gameDescription: string;
};
export default function EditCreationDialog() {
  const [isOpen, setIsOpen] = useAtom(arcanaEditCreationDialogOpen);
  const editingCreationId = 9013;
  // const editingCreationId = useAtomValue(editingCreationIdAtom);
  // const { data, isLoading } = useFetchGameDetail({
  //   id: editingCreationId,
  //   onSuccess: () => {
  //     ReactGA.event({
  //       action: EventName.EditWork,
  //       category: EventCategory.Editorium,
  //       label: editingCreationId?.toString(),
  //     });
  //   },
  // });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImagesSelected = (urls: string[]) => {
    setSelectedImages(urls);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  //   watch,
  //   setError,
  //   clearErrors,
  // } = useForm<GameDetailForm>();
  // const { mutate } = useMutationUpdateGame();

  // const onSubmit = (values: GameDetailForm) => {
  //   if (!editingCreationId) return;
  //   const { gameDescription, gameName } = values;
  //   mutate(
  //     { id: editingCreationId, gameDescription, gameName, screenshots: selectedImages },
  //     {
  //       onSuccess: () => {
  //         let changeValue = 0;
  //         if (data?.gameName !== gameName) changeValue += 100;
  //         if (data?.gameDescription !== gameDescription) changeValue += 10;
  //         if (data?.screenshots.toString() !== selectedImages.toString()) changeValue += 1;
  //         ReactGA.event({
  //           action: EventName.WorkSave,
  //           category: EventCategory.Editorium,
  //           label: changeValue.toString(),
  //         });
  //         setIsOpen(false);
  //       },
  //     },
  //   );
  // };

  // const onError = useFormOnError();

  // reset default values
  // useEffect(() => {
  //   const { gameName, gameDescription, mainImage, screenshots } = data ?? {};
  //   setValue('gameName', gameName ?? '');
  //   setValue('gameDescription', gameDescription ?? '');
  //   setSelectedImages(screenshots ?? []);
  // }, [data, setValue]);

  // watch gameDescription length
  // const watchGameName = watch('gameName');
  // const watchGameDesc = watch('gameDescription');
  // const handleInputChange = useCallback(
  //   (e: any) => {
  //     const currentLength = e.target.value.length;

  //     if (currentLength > 50) {
  //       setError('gameName', {
  //         type: 'manual',
  //         message: "Work's name too long. Limited in 50 characters.",
  //       });
  //     } else {
  //       clearErrors(['gameName']);
  //       setValue('gameName', e.target.value);
  //     }
  //   },
  //   [clearErrors, setError, setValue],
  // );

  // const handleTextareaChange = useCallback(
  //   (e: any) => {
  //     const currentLength = e.target.value.length;

  //     if (currentLength > 250) {
  //       setError('gameDescription', {
  //         type: 'manual',
  //         message: "Work's introduction too long. Limited in 250 characters.",
  //       });
  //     } else {
  //       clearErrors(['gameDescription']); // specify fields to clear
  //       setValue('gameDescription', e.target.value); // trigger re-render
  //     }
  //   },
  //   [clearErrors, setError, setValue],
  // );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title={`Edit Work #${editingCreationId}`}
      render={({ close }) => (
        <div className="w-[600px] p-6">
          <h3 className="text-sm font-medium">Images</h3>
          <form
          // onSubmit={handleSubmit(onSubmit, onError)}
          >
            <ImageSelector
              className="mt-3"
              images={selectedImages}
              onChange={handleImagesSelected}
              // defaultImages={[data?.mainImage ?? '']}
              itemClass="h-[4.5rem] w-[7.875rem]"
            />
            <h3 className="mt-8 text-sm font-medium">Display Name</h3>
            <div className="vertical-scroll mt-3 flex w-full items-center gap-2 rounded-sm bg-white/[0.12] p-3 text-xs/5 backdrop-blur-lg">
              <input
                className="flex-grow bg-transparent"
                // {...register('gameName', {
                //   maxLength: { message: "Work's name too long. Limited in 50 characters.", value: 50 },
                //   required: "Work name and introduction can't be empty.",
                // })}
                // onChange={handleInputChange}
              />
              {/* <p className="text-gray-100">{watchGameName.length}/50</p> */}
            </div>
            {/* {errors.gameName && <p className="mt-1 text-xs text-red-500">{errors.gameName.message}</p>} */}
            {/* Social Links */}
            <h3 className="mt-8 text-sm font-medium">Introduction</h3>
            <div className="vertical-scroll mt-3 rounded-sm bg-white/[0.12] p-3 text-xs/5 backdrop-blur-lg">
              <textarea
                className="vertical-scroll w-full resize-none appearance-none bg-transparent"
                rows={5}
                // {...register('gameDescription', {
                //   maxLength: { message: "Work's introduction too long. Limited in 250 characters.", value: 250 },
                //   required: "Work name and introduction can't be empty.",
                // })}
                // onChange={handleTextareaChange}
              />
              {/* <p className="text-right text-gray-100"> {watchGameDesc?.length}/250</p> */}
            </div>
            {/* {errors.gameDescription && <p className="mt-1 text-xs text-red-500">{errors.gameDescription.message}</p>} */}
            <div>
              <div className="mt-3 flex items-center justify-end gap-5">
                <StyledButton
                  type="button"
                  variant="bordered"
                  onClick={() => {
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
