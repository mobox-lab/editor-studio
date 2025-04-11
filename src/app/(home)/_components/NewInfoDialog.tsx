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

// TypeScript internationalization: style: 💄 update button design system
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    style____update_button_design_system: 'style: 💄 update button design system',
    style____update_button_design_system_description: 'Description for style: 💄 update button design system'
  },
  zh: {
    style____update_button_design_system: 'style: 💄 update button design system',
    style____update_button_design_system_description: 'style: 💄 update button design system的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
