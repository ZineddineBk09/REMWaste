# Testing Documentation

## Overview

This project uses **Vitest** with **React Testing Library** for comprehensive testing coverage. Our testing strategy focuses on user behavior, accessibility, and component integration rather than implementation details.

## Testing Stack

- **Vitest**: Fast unit test framework with native ES modules support
- **React Testing Library**: Testing utilities focused on user interactions
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: Realistic user interaction simulation
- **jsdom**: DOM environment for Node.js testing

## Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── SkipCard.test.tsx
│   │   ├── ProgressBar.test.tsx
│   │   └── SelectionSummary.test.tsx
├── hooks/
│   └── __tests__/
│       └── useUrlState.test.tsx
└── test/
    ├── setup.ts          # Global test configuration
    └── utils.tsx         # Custom render utilities
```

## Testing Philosophy

### 1. **User-Centric Testing**
- Test what users see and interact with
- Focus on behavior over implementation
- Use semantic queries (role, label, text)

### 2. **Accessibility First**
- Verify ARIA attributes and roles
- Test keyboard navigation
- Ensure screen reader compatibility

### 3. **Integration Over Isolation**
- Test components with their providers
- Mock external dependencies, not internal logic
- Test user workflows end-to-end

## Test Categories

### Component Tests
- **SkipCard**: User interactions, selection states, accessibility
- **ProgressBar**: Responsive layouts, step progression, icon rendering
- **SelectionSummary**: Conditional rendering, loading states, callbacks

### Hook Tests
- **useUrlState**: URL synchronization, state persistence, browser history

### Integration Tests
- Component interaction with React Query
- URL state management across page refreshes
- Responsive behavior across breakpoints

## Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with coverage
yarn test:coverage

# Run tests with UI
yarn test:ui
```

## Test Configuration

### Vitest Config (`vitest.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Global Setup (`src/test/setup.ts`)
- Jest DOM matchers
- Mock browser APIs (IntersectionObserver, ResizeObserver, matchMedia)
- Automatic cleanup after each test

### Custom Render (`src/test/utils.tsx`)
- Wraps components with necessary providers (React Query, HeroUI)
- Provides mock data and API responses
- Simplifies test setup

## Testing Patterns

### 1. **Component Rendering**
```typescript
it('renders skip information correctly', () => {
  render(<SkipCard skip={mockSkip} isSelected={false} onSelect={mockOnSelect} />);
  
  expect(screen.getByText('6 Yard Skip')).toBeInTheDocument();
  expect(screen.getByText('£180')).toBeInTheDocument();
});
```

### 2. **User Interactions**
```typescript
it('calls onSelect when clicked', async () => {
  const user = userEvent.setup();
  render(<SkipCard skip={mockSkip} isSelected={false} onSelect={mockOnSelect} />);
  
  await user.click(screen.getByRole('button', { name: /select this skip/i }));
  
  expect(mockOnSelect).toHaveBeenCalledWith(mockSkip);
});
```

### 3. **Accessibility Testing**
```typescript
it('has proper accessibility attributes', () => {
  render(<SkipCard skip={mockSkip} isSelected={false} onSelect={mockOnSelect} />);
  
  const card = screen.getByRole('button');
  expect(card).toHaveAttribute('aria-selected', 'false');
  expect(card).toHaveAttribute('tabIndex', '0');
});
```

### 4. **Responsive Behavior**
```typescript
it('renders mobile and desktop layouts', () => {
  render(<ProgressBar steps={mockSteps} />);
  
  // Both layouts should be present (one hidden on mobile, one on desktop)
  const desktopLayout = document.querySelector('.hidden.md\\:block');
  const mobileLayout = document.querySelector('.md\\:hidden.fixed');
  
  expect(desktopLayout).toBeInTheDocument();
  expect(mobileLayout).toBeInTheDocument();
});
```

### 5. **Hook Testing**
```typescript
it('updates URL when state changes', () => {
  const { result } = renderHook(() => useUrlState());
  
  act(() => {
    result.current.updateUrlState({ selectedSkipId: '456' });
  });
  
  expect(mockHistory.replaceState).toHaveBeenCalledWith(
    {},
    '',
    '/test?step=select-skip&skipId=456&postcode=NR32&area=Lowestoft'
  );
});
```

## Common Testing Challenges & Solutions

### 1. **Duplicate Elements (Mobile/Desktop Layouts)**
**Problem**: Components render both mobile and desktop layouts simultaneously.

**Solution**: Use `getAllBy*` queries and select the first element:
```typescript
const continueButtons = screen.getAllByRole('button', { name: /continue/i });
expect(continueButtons[0]).toBeInTheDocument();
```

### 2. **Provider Dependencies**
**Problem**: Components require React Query and UI providers.

**Solution**: Use custom render utility with all providers:
```typescript
// src/test/utils.tsx
const AllTheProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  </QueryClientProvider>
);
```

### 3. **Browser API Mocking**
**Problem**: Components use browser APIs not available in test environment.

**Solution**: Mock in setup file:
```typescript
// src/test/setup.ts
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

### 4. **Async State Management**
**Problem**: React Query introduces async behavior.

**Solution**: Configure test client with no retries and immediate resolution:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, gcTime: 0 },
    mutations: { retry: false },
  },
});
```

## Coverage Goals

- **Components**: 90%+ line coverage
- **Hooks**: 95%+ line coverage
- **Critical User Paths**: 100% coverage
- **Accessibility**: All interactive elements tested

## Best Practices

1. **Write tests first** for new features (TDD)
2. **Test user behavior**, not implementation details
3. **Use semantic queries** (getByRole, getByLabelText)
4. **Mock external dependencies**, not internal logic
5. **Keep tests simple** and focused on single behaviors
6. **Use descriptive test names** that explain the expected behavior
7. **Group related tests** with describe blocks
8. **Clean up** after each test (automatic with our setup)

## Continuous Integration

Tests run automatically on:
- Every commit (pre-commit hook)
- Pull requests (GitHub Actions)
- Before deployment (CI/CD pipeline)

Coverage reports are generated and tracked to ensure quality standards are maintained. 