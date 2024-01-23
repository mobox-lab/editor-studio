import { fetchBoxWallet } from '@/api/mobox';
import { useQuery } from '@tanstack/react-query';

export function useFetchMoboxBoxWallet() {
  return useQuery({
    queryKey: ['fetch_mobox_box_wallet'],
    queryFn: () => fetchBoxWallet(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}
