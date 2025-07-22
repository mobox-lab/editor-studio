import { GparkGameRoomItem } from '@/api';
import { useCopyToClipboard } from 'react-use';
import RoomSVG from '@/../public/svg/room.svg?component';
import CopySVG from '@/../public/svg/copy.svg?component';
import { toast } from 'react-toastify';

export default function SceneRoomItem({ data }: { data: GparkGameRoomItem }) {
  const [, copyToClipboard] = useCopyToClipboard();

  const onCopyClick = () => {
    copyToClipboard(data.roomId);
    toast.success(`Copied Room: ${data.roomId}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-center gap-1 text-sm/6 font-medium">
        <RoomSVG className="w-3.5" />
        Room {data.roomId} ({data.number}/{data.limitNumber})
      </div>
      <CopySVG className="w-6 cursor-pointer" onClick={onCopyClick} />
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: fix: 🐛 correct language switching bug
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
    fix____correct_language_switching_bug: 'fix: 🐛 correct language switching bug',
    fix____correct_language_switching_bug_description: 'Description for fix: 🐛 correct language switching bug'
  },
  zh: {
    fix____correct_language_switching_bug: 'fix: 🐛 correct language switching bug',
    fix____correct_language_switching_bug_description: 'fix: 🐛 correct language switching bug的描述'
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
