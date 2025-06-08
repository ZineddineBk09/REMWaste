import { useState, useEffect, useCallback } from 'react';

interface UrlState {
  step: string;
  selectedSkipId: string | null;
  postcode: string;
  area: string;
}

interface UseUrlStateReturn {
  urlState: UrlState;
  updateUrlState: (updates: Partial<UrlState>) => void;
  getShareableUrl: () => string;
}

export const useUrlState = (): UseUrlStateReturn => {
  const [urlState, setUrlState] = useState<UrlState>({
    step: 'select-skip',
    selectedSkipId: null,
    postcode: 'NR32',
    area: 'Lowestoft',
  });

  // Read from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newState: UrlState = {
      step: searchParams.get('step') || 'select-skip',
      selectedSkipId: searchParams.get('skipId'),
      postcode: searchParams.get('postcode') || 'NR32',
      area: searchParams.get('area') || 'Lowestoft',
    };
    setUrlState(newState);
  }, []);

  // Update URL when state changes
  const updateUrlState = useCallback((updates: Partial<UrlState>) => {
    setUrlState(currentState => {
      const newState = { ...currentState, ...updates };
      
      // Update URL without page reload
      const searchParams = new URLSearchParams();
      searchParams.set('step', newState.step);
      if (newState.selectedSkipId) {
        searchParams.set('skipId', newState.selectedSkipId);
      }
      searchParams.set('postcode', newState.postcode);
      searchParams.set('area', newState.area);

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
      
      return newState;
    });
  }, []);

  // Get shareable URL
  const getShareableUrl = useCallback(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('step', urlState.step);
    if (urlState.selectedSkipId) {
      searchParams.set('skipId', urlState.selectedSkipId);
    }
    searchParams.set('postcode', urlState.postcode);
    searchParams.set('area', urlState.area);

    return `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
  }, [urlState]);

  return {
    urlState,
    updateUrlState,
    getShareableUrl,
  };
}; 