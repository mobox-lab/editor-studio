import { RadioOption } from '@/components/ui/radio/RadioGroup';
import { useMemo } from 'react';
import { useMutationP12UpdateChainNames } from './useMutationP12UpdateChainNames';
import { useThrottle } from '../util/useThrottle';
import { useAtomValue } from 'jotai';
import { p12ProfileAtom } from '@/atoms/profile';
import { toast } from 'react-toastify';

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
        suffix: 'Custom',
        beforeOnChange: (value: string) => {
          if (value.includes('.')) {
            // not allowed to input "."
            toast.error(`Nickname shouldn't include dot, please try again.`);
            return false;
          }
          return true;
        },
      },
      {
        key: 'gparkName', // TODO: API
        suffix: 'GPark Name',
        isInput: true,
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
