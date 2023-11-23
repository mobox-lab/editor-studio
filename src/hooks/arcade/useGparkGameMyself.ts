import { useQuery } from '@tanstack/react-query';
import { fetchGparkGameMyself } from '@/api';

export  function useGparkGameMyself() {
  return useQuery({
    queryKey: ['gpark_game_myself'],
    queryFn: () => fetchGparkGameMyself({ pageNumber: 1, pageSize: 10 }),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}
