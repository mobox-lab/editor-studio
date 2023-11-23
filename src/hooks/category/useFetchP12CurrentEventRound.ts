import { fetchP12EventRound } from '@/api';
import { currentEventRoundInfoAtom } from '@/atoms/category/arcana';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export const useFetchP12CurrentEventRound = () => {
  const setCurrentEventRoundInfo = useSetAtom(currentEventRoundInfoAtom);
  const { data, isLoading, isSuccess } = useQuery({ queryKey: ['fetch_p12_event_round'], queryFn: () => fetchP12EventRound() });

  useEffect(() => {
    if (isSuccess && data?.code === 200) {
      setCurrentEventRoundInfo(data.data);
    }
  }, [isSuccess, data, setCurrentEventRoundInfo]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};
