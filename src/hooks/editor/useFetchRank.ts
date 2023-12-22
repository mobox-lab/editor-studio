import { EditorDevRankItem, fetchP12DevRank } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export const useFetchRank = () => {
  const [firstThree, setFirstThree] = useState<EditorDevRankItem[]>([]);
  const [rest, setRest] = useState<EditorDevRankItem[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetch_p12_dev_rank'],
    queryFn: () => fetchP12DevRank(),
    select: (res) => (res.code === 200 ? res.data : []),
  });

  useEffect(() => {
    if (data) {
      setFirstThree(data.slice(0, 3));
      setRest(data.slice(3));
    }
  }, [data]);

  return useMemo(() => ({ data, firstThree, rest, isLoading }), [data, firstThree, rest, isLoading]);
};
