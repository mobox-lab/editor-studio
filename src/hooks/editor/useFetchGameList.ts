import { fetchEditorGameList } from '@/api/p12';
import { editorGamesListAtom, editorGamesTop3ListAtom } from '@/atoms/editor';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { EditorFetchKey } from '@/constants/editor';

export const useFetchEditorGameList = () => {
  const setEditorGameList = useSetAtom(editorGamesListAtom);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [EditorFetchKey.EditorGameList],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchEditorGameList({ offset: pageParam + 1, pageSize: 100 });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.dataList?.length === 10) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (data) {
      setEditorGameList(data);
    }
  }, [data, setEditorGameList]);

  return useMemo(
    () => ({ data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch }),
    [data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch],
  );
};

export const useFetchEditorGameListTop3 = () => {
  const setTop3GameList = useSetAtom(editorGamesTop3ListAtom);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [EditorFetchKey.FetchEditorGameListTop3],
    queryFn: () => fetchEditorGameList({ offset: 1, pageSize: 3 }),
    select: (res) => (res.code === 200 ? res.data.dataList : []),
  });

  useEffect(() => {
    if (data) {
      setTop3GameList(data);
    }
  }, [data, setTop3GameList]);
  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};
