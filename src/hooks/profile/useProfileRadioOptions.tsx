import { RadioOption } from '@/components/ui/radio/RadioGroup';
import { useMemo } from 'react';

export const useProfileRadioOptions = () => {
  return useMemo(() => {
    const walletAddress = '0x9aB3C5644fC631B9996Ef96732Cd1ef1c5B3a2B2'; //TODO: API
    // const { walletAddress, ccProfileHandle, p12Name, nickname, ensName, spaceIdArb, spaceIdBnb } = profileData ?? {};
    const radioOpts: Array<RadioOption | RadioOption[] | null> = [
      {
        key: 'custom',
        suffix: 'Custom',
        isInput: true,
      },
      {
        key: 'gpark',
        suffix: 'GPark Name',
        isInput: true,
      },
      {
        key: 'ccProfileHandle',
        label: 'Sync .cyber domain',
        value: '.cyber',
      },
      { key: 'ensName', label: 'Sync .eth domain', value: '.eth' },
      {
        key: 'spaceIdBnb',
        label: 'Sync .bnb domain',
        value: '.bnb',
      },
      {
        key: 'spaceIdArb',
        label: 'Sync .arb domain',
        value: '.arb',
      },
    ];
    return radioOpts;
  }, []);
};
