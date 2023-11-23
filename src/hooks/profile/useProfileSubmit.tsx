import { ProfileFormData } from '@/app/profile/_components/ProfileForm';
import { useCallback, useMemo } from 'react';

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
