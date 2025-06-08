import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Skip } from '../types/skip';
import { skipQueryKeys } from '../services/skipApi';

interface UseSkipSelectionReturn {
  selectedSkip: Skip | null;
  selectSkip: (skip: Skip) => void;
  clearSelection: () => void;
  isSelecting: boolean;
}

export const useSkipSelection = (postcode: string, area: string): UseSkipSelectionReturn => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const queryClient = useQueryClient();

  // Mutation for handling skip selection (can be extended for API calls later)
  const selectSkipMutation = useMutation({
    mutationFn: async (skip: Skip) => {
      // Simulate API call for skip selection
      // In a real app, this would send the selection to the backend
      await new Promise(resolve => setTimeout(resolve, 0));
      return skip;
    },
    onMutate: async (skip: Skip) => {
      // Optimistic update
      setSelectedSkip(skip);
    },
    onError: (error) => {
      // Rollback on error
      setSelectedSkip(null);
      console.error('Failed to select skip:', error);
    },
    onSuccess: () => {
      // Update the cache with selection metadata if needed
      queryClient.setQueryData(
        skipQueryKeys.byLocation(postcode, area),
        (oldData: Skip[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map(skip => ({
            ...skip,
            // Add selection metadata if needed
          }));
        }
      );
    },
  });

  const selectSkip = useCallback((skip: Skip) => {
    // Prevent unnecessary re-selection of the same skip
    if (selectedSkip?.id === skip.id) {
      return;
    }
    selectSkipMutation.mutate(skip);
  }, [selectSkipMutation, selectedSkip?.id]);

  const clearSelection = useCallback(() => {
    setSelectedSkip(null);
  }, []);

  return {
    selectedSkip,
    selectSkip,
    clearSelection,
    isSelecting: selectSkipMutation.isPending,
  };
}; 