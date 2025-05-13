import { useMemo } from 'react';
import { RadioOption } from '@/components/ui/radio/RadioGroup';
import { useMutationP12UpdateChainNames } from './useMutationP12UpdateChainNames';
import { useThrottle } from '../util/useThrottle';
import { useAtomValue } from 'jotai';
import { p12ProfileAtom } from '@/atoms/profile';
import { toast } from 'react-toastify';
import { sendEvent } from '@/utils';

export const useProfileRadioOptions = () => {
  const { mutate: updateChainNames } = useMutationP12UpdateChainNames();
  const syncChainNames = useThrottle(updateChainNames, 1000);
  const profileData = useAtomValue(p12ProfileAtom);

  return useMemo(() => {
    const { ccProfileHandle, nickname, ensName, spaceIdArb, spaceIdBnb } = profileData ?? {};
    const radioOpts: Array<RadioOption | RadioOption[] | null> = [
      {
        key: 'nickname',
        isInput: true,
        value: nickname ?? '',
        className: 'col-span-2',
        inputOnForce: () => sendEvent('pf_edit_username', '修改用户名'),
        beforeOnChange: (value: string) => {
          if (value.includes('.')) {
            // not allowed to input "."
            toast.error(`Nickname shouldn't include dot, please try again.`);
            return false;
          }
          if (value.length > 16) {
            toast.error(`Nickname must in 16 characters, please try again.`);
            return false;
          }
          return true;
        },
      },
      {
        key: 'ccProfileHandle',
        label: ccProfileHandle ?? 'Sync .cyber domain',
        value: ccProfileHandle ?? '.cyber',
        ...(ccProfileHandle ? {} : { onClick: (e: any) => syncChainNames() }),
      },
      {
        key: 'ensName',
        label: ensName ?? 'Sync .eth domain',
        value: ensName ?? '.eth',
        ...(ensName ? {} : { onClick: (e: any) => syncChainNames() }),
      },
      {
        key: 'spaceIdBnb',
        label: spaceIdBnb ?? 'Sync .bnb domain',
        value: spaceIdBnb ?? '.bnb',
        ...(spaceIdBnb ? {} : { onClick: (e: any) => syncChainNames() }),
      },
      {
        key: 'spaceIdArb',
        label: spaceIdArb ?? 'Sync .arb domain',
        value: spaceIdArb ?? '.arb',
        ...(spaceIdArb ? {} : { onClick: (e: any) => syncChainNames() }),
      },
    ];
    return radioOpts;
  }, [profileData, syncChainNames]);
};

// TypeScript internationalization: docs: 📝 update security guidelines
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
    docs____update_security_guidelines: 'docs: 📝 update security guidelines',
    docs____update_security_guidelines_description: 'Description for docs: 📝 update security guidelines'
  },
  zh: {
    docs____update_security_guidelines: 'docs: 📝 update security guidelines',
    docs____update_security_guidelines_description: 'docs: 📝 update security guidelines的描述'
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
