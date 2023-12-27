import { CheckResult, P12ProfileParams, qtClient } from '@/api';
import { ProfileFormData } from '@/app/profile/_components/ProfileForm';
import { p12ProfileAtom } from '@/atoms/profile';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useThrottle } from '../util/useThrottle';
import { useMutationCheckName } from './useMutationCheckName';
import { useMutationEditP12Profile } from './useMutationEditP12Profile';
import { sendEvent } from '@/utils';

export const useProfileSubmit = (selectedRadioKey?: string) => {
  const [profileData, setProfileData] = useAtom(p12ProfileAtom);
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: mutateEditProfile } = useMutationEditP12Profile();
  const updateProfile = useThrottle(mutateEditProfile, 700);

  const { mutateAsync: mutateCheckName } = useMutationCheckName();
  const checkName = useThrottle(mutateCheckName, 700);

  const onSubmit = useCallback(
    async (values: ProfileFormData) => {
      try {
        setLoading(true);
        const { showName, twitter, discord } = profileData ?? {};
        const { displayName, bio } = values;
        const newProfile: P12ProfileParams = { bio, showName, twitter, discord };
        Object.assign(newProfile, {
          bio,
        });
        const displayNameKey = selectedRadioKey ?? '';
        if (['nickname', 'p12Name'].includes(displayNameKey)) {
          // Check Name Available
          const isUsing = displayName === profileData?.[displayNameKey as 'p12Name' | 'nickname'];
          const { data: available } = await checkName({ type: displayNameKey, name: displayName });

          if (isUsing || available === CheckResult.NOT_EXIST) {
            Object.assign(newProfile, {
              [displayNameKey]: displayName,
              showName: displayName,
            });
          } else if (!available) {
            setLoading(false);
            !isUsing && toast.error(`${displayNameKey} check failed.`);
            return;
          } else {
            setLoading(false);
            !isUsing && toast.error(`${displayNameKey} already exists, please change.`);
            return;
          }
        } else {
          if (['.eth', '.bnb', '.arb', 'aspecta.id', '.cyber'].includes(displayName)) {
            // Has not ensName spaceIdBnb spaceIdArb
            setLoading(false);
            toast.error(`Have not ${displayName}, please click to sync`);
            return;
          } else {
            // ccProfileHandle / address / Has ensName spaceIdBnb spaceIdArb
            Object.assign(newProfile, { showName: displayName });
          }
        }
        // let changeValue = 0;
        // if (newProfile.bio !== profileData?.bio) changeValue += 1000;
        // if (newProfile.discord !== profileData?.discord) changeValue += 100;
        // if (newProfile.showName !== profileData?.showName) changeValue += 10;
        // if (newProfile.twitter !== profileData?.twitter) changeValue += 1;
        // ReactGA.event({
        //   action: EventName.ProfileSave,
        //   category: EventCategory.Editorium,
        //   label: changeValue.toString(),
        // });
        await updateProfile(newProfile);
        sendEvent('pf_save', '保存个人信息', { action: 1 });
        setProfileData((prev) => ({ ...prev, ...newProfile }));
        setLoading(false);
        toast.success('Save changes successfully.');
        qtClient.refreshProfile();
      } catch (e: any) {
        setLoading(false);
        toast.error('Save changes failed.', e.message);
      }
    },
    [checkName, profileData, selectedRadioKey, setProfileData, updateProfile],
  );

  return useMemo(
    () => ({
      onSubmit,
      isLoading,
    }),
    [isLoading, onSubmit],
  );
};
