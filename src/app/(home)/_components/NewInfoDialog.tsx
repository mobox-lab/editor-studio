import { NewsItem } from '@/api';
import { p12NewDialogOpenAtom, p12NewInfoAtom } from '@/atoms/p12';
import Dialog from '@/components/ui/dialog';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';

const NewInfoDialog = () => {
  const newInfo = useAtomValue(p12NewInfoAtom);
  const [open, setOpen] = useAtom(p12NewDialogOpenAtom);
  const newDate = useMemo(() => {
    if (!newInfo?.createTime) return null;
    return dayjs(newInfo.createTime).format('MMM DD, YYYY');
  }, [newInfo]);
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => setOpen(open)}
      className="border-none bg-transparent"
      headerClass="bg-transparent text-center px-0 py-0"
      titleClass="flex-center flex-grow"
      title={
        <div className="flex flex-col items-start gap-1 text-left">
          <h1 className="w-[52rem] text-xl/6">{newInfo?.title}</h1>
          <p className="text-sm/4 text-gray-300">{newDate}</p>
        </div>
      }
      closeArrowClass="h-7.5 w-7.5"
      render={() => (
        <div className="flex w-[52rem] flex-col pt-6">
          <div
            className="new-dialog__reset h-[40rem] overflow-auto"
            dangerouslySetInnerHTML={{ __html: newInfo?.text ?? '' }}
          ></div>
        </div>
      )}
    />
  );
};
export default NewInfoDialog;

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
