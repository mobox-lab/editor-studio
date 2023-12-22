import { fetchGparkUserInfo } from '@/api';
import { gparkProfileAtom } from '@/atoms/profile';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export function useGparkUserInfo() {
  const setUserProfile = useSetAtom(gparkProfileAtom);

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ['fetch_gpark_user_info'],
    queryFn: () => fetchGparkUserInfo(),
  });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setUserProfile(data?.data);
    }
  }, [isSuccess, data, setUserProfile]);

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
}
