import { useState, useEffect } from 'react';
import type { Skip, UseSkipsReturn } from '../types/skip';
import { API_BASE_URL } from '../utils/constants';

export const useSkips = (postcode = 'NR32', area = 'Lowestoft'): UseSkipsReturn => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
      }
      
      const data: Skip[] = await response.json();
      
      // Sort skips by size for consistent display
      const sortedSkips = data.sort((a, b) => a.size - b.size);
      setSkips(sortedSkips);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch skip data';
      setError(errorMessage);
      console.error('Error fetching skips:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async (): Promise<void> => {
    await fetchSkips();
  };

  useEffect(() => {
    fetchSkips();
  }, [postcode, area]);

  return {
    skips,
    loading,
    error,
    refetch,
  };
}; 