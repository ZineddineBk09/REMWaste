import type { Skip } from '../types/skip';
import { API_BASE_URL } from '../utils/constants';
import { mockSkips } from '../utils/mockData';

export interface FetchSkipsParams {
  postcode: string;
  area: string;
}

export const fetchSkips = async ({ postcode, area }: FetchSkipsParams): Promise<Skip[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/skips/by-location?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
    }
    
    const data: Skip[] = await response.json();
    
    // Sort skips by size for consistent display
    return data.sort((a, b) => a.size - b.size);
  } catch (error) {
    console.error('Error fetching skips from API:', error);
    
    // Use mock data as fallback
    console.log('Using mock data as fallback');
    return new Promise((resolve) => {
      // Simulate network delay for better UX testing
      setTimeout(() => {
        resolve(mockSkips.sort((a, b) => a.size - b.size));
      }, 1000);
    });
  }
};

// Query keys for React Query
export const skipQueryKeys = {
  all: ['skips'] as const,
  byLocation: (postcode: string, area: string) => 
    [...skipQueryKeys.all, 'by-location', { postcode, area }] as const,
}; 