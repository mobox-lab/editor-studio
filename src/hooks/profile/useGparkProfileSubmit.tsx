import { GparkUserInfoParams, qtClient } from '@/api';
import { GparkProfileFormData } from '@/app/profile/_components/GparkProfileForm';
import { gparkProfileAtom } from '@/atoms/profile';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useThrottle } from '../util/useThrottle';
import { useMutationEditGparkUserInfo } from './useMutationEditGparkUserInfo';

export const useGparkProfileSubmit = () => {
  const [profileData, setProfileData] = useAtom(gparkProfileAtom);
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: mutateEditProfile } = useMutationEditGparkUserInfo();
  const updateProfile = useThrottle(mutateEditProfile, 700);

  const onSubmit = useCallback(
    async (values: GparkProfileFormData) => {
      try {
        setLoading(true);
        const { displayName, bio } = values;
        const newProfile: GparkUserInfoParams = { nickname: displayName, signature: bio };
        await updateProfile(newProfile);
        setProfileData((prev) => ({ ...prev, ...newProfile }));
        setLoading(false);
        toast.success('Save changes successfully.');
        qtClient.refreshProfile();
      } catch (e: any) {
        setLoading(false);
        toast.error('Save changes failed.', e.message);
      }
    },
    [setProfileData, updateProfile],
  );

  return useMemo(
    () => ({
      onSubmit,
      isLoading,
    }),
    [isLoading, onSubmit],
  );
};
