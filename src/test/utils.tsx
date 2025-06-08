import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroUIProvider } from '@heroui/react';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Create a query client for testing
export const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

// Mock data for testing
export const mockSkipData = [
  {
    id: 1,
    size: 4,
    price_before_vat: 120,
    vat: 20,
    hire_period_days: 7,
    allowed_on_road: true,
  },
  {
    id: 2,
    size: 6,
    price_before_vat: 150,
    vat: 20,
    hire_period_days: 7,
    allowed_on_road: false,
  },
  {
    id: 3,
    size: 8,
    price_before_vat: 180,
    vat: 20,
    hire_period_days: 14,
    allowed_on_road: true,
  },
];

// Mock API responses
export const mockApiResponses = {
  success: {
    status: 200,
    data: mockSkipData,
  },
  error: {
    status: 500,
    message: 'Internal Server Error',
  },
  loading: {
    status: 'loading',
  },
}; 