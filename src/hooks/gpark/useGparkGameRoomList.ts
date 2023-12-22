import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchGparkGameRoomList, fetchGparkMWRoomStatus } from '@/api';
import type { GparkGameRoomListParams } from '@/api';

export function useGparkGameRoomStatus() {
  return useMutation({ mutationFn: (roomId: string) => fetchGparkMWRoomStatus(roomId) });
}

export function useGparkGameRoomList(params: GparkGameRoomListParams) {
  const { data, isLoading } = useQuery({
    queryKey: ['gpark_game_room_list', params],
    queryFn: () => fetchGparkGameRoomList(params),
    enabled: !!params.version,
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
