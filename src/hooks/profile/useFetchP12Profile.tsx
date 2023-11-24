import { fetchP12ProfileData } from '@/api';
import { p12ProfileAtom } from '@/atoms/profile';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export const useFetchP12Profile = () => {
  const setUserProfile = useSetAtom(p12ProfileAtom);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['fetch_p12_profile_data'],
    queryFn: () => fetchP12ProfileData(),
  });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setUserProfile(data?.data);
    }
  }, [isSuccess, data, setUserProfile]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};
