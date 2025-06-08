import { HeroUIProvider } from '@heroui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SelectSkipPage } from './pages/SelectSkipPage';
import { queryClient } from './utils/queryClient';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <SelectSkipPage />
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
