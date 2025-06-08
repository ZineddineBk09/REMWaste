import { useQuery } from '@tanstack/react-query';
import type { UseSkipsReturn } from '../types/skip';
import { fetchSkips, skipQueryKeys } from '../services/skipApi';

export const useSkips = (postcode = 'NR32', area = 'Lowestoft'): UseSkipsReturn => {
  const {
    data: skips = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: skipQueryKeys.byLocation(postcode, area),
    queryFn: () => fetchSkips({ postcode, area }),
    enabled: Boolean(postcode && area), // Only fetch if both params are provided
  });

  return {
    skips,
    loading,
    error: error ? (error as Error).message : null,
    refetch: async () => {
      await refetch();
    },
  };
}; 