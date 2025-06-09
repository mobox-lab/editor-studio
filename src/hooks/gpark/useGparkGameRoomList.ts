import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchGparkGameRoomList, fetchGparkMWRoomStatus } from '@/api';
import type { GparkGameRoomListParams } from '@/api';

export function useGparkGameRoomStatus() {
  return useMutation({ mutationFn: (roomId: string) => fetchGparkMWRoomStatus(roomId) });
}

export function useGparkGameRoomList(params: GparkGameRoomListParams) {
  const isEnabled = useMemo(() => !!params.version && !!(params.gameId || params.sceneId), [params.gameId, params.sceneId, params.version]);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['gpark_game_room_list', params],
    queryFn: () => fetchGparkGameRoomList(params),
    enabled: isEnabled,
    select: (res) => (res.code === 200 ? res.data : undefined),
    refetchInterval: 30_000,
  });
  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
