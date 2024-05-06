import { fetchDvBetaWhiteList } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useFetchDvBetaWhitelist() {
  return useQuery({
    queryKey: ['fetch_dv_beta_whitelist'],
    queryFn: () => fetchDvBetaWhiteList(),
    select: (res) => (res.code === 200 ? res.data : []),
  });
}
