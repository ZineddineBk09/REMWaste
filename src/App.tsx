import { HeroUIProvider } from '@heroui/react';
import { SelectSkipPage } from './pages/SelectSkipPage';
import './App.css';

function App() {
  return (
    <HeroUIProvider>
      <SelectSkipPage />
    </HeroUIProvider>
  );
}

export default App;
