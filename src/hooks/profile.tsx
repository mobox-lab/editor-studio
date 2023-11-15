import { ProfileFormData } from '@/app/profile/_components/ProfileForm';
import { RadioOption } from '@/components/ui/radio/RadioGroup';
import { shortenAddress } from '@/utils/shorten';
import { useCallback, useMemo } from 'react';

export const useProfileRadioOptions = () => {
  // const { mutate: updateChainNames } = useMutationUpdateChainNames();
  // const syncChainNames = useThrottle(updateChainNames, 1000);
  // const profileData = useAtomValue(userProfileAtom);
  // const aspectaId = useAtomValue(aspectaIdAtom);
  // const { authenticate } = useAspectaOAuth2();
  // const [currentAspectaAuthKey, setCurrentAspectaAuthKey] = useAtom(currentAspectaAuthKeyAtom);
  // const { mutate } = useMutationBindAspecta();

  // useEvent('storage', (event: StorageEvent) => {
  //   if (!event.newValue) return;
  //   if (event.key === STORAGE_KEY.ASPECTA_AUTH_CODE && currentAspectaAuthKey === ASPECTA_ON_SUCCESS_KEY.BIND) {
  //     const code = event.newValue;
  //     mutate(code ?? '');
  //   }
  // });

  return useMemo(() => {
    const walletAddress = '0x9aB3C5644fC631B9996Ef96732Cd1ef1c5B3a2B2'; //TODO: API
    // const { walletAddress, ccProfileHandle, p12Name, nickname, ensName, spaceIdArb, spaceIdBnb } = profileData ?? {};
    const radioOpts: Array<RadioOption | RadioOption[] | null> = [
      { key: 'address', label: shortenAddress(walletAddress), value: walletAddress },
      {
        key: 'ccProfileHandle',
        label: 'Sync .cyber domain',
        value: '.cyber',
      },
      { key: 'aspecta.id', label: 'aspecta.id', value: 'aspectaId' },
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

export const useProfileSubmit = (selectedRadioKey?: string) => {
  const onSubmit = useCallback(
    async (values: ProfileFormData) => {
      console.log(`submit values )===============>`, values);
      console.log(`selectedRadioKey )===============>`, selectedRadioKey);
    },
    [selectedRadioKey],
  );

  return useMemo(
    () => ({
      onSubmit,
      // isLoading,
    }),
    [onSubmit],
  );
};
