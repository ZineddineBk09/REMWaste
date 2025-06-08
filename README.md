# REMWaste - Skip Selection App

A modern, pixel-perfect React application for selecting waste skip sizes with a beautiful UI built using HeroUI and Tailwind CSS.

## 📸 Screenshots

### Desktop Experience
![Desktop View](./public/screenshots/Screenshot%202025-06-08%20at%2014.42.43.png)

### Mobile Experience
![Mobile View](./public/screenshots/Screenshot%202025-06-08%20at%2014.42.28.png)

## 🚀 Features

- **Modern UI/UX**: Built with HeroUI components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and ARIA support
- **TypeScript**: Fully typed for better development experience
- **Advanced Data Management**: TanStack Query for caching, background refetching, and optimistic updates
- **Real-time Data**: Fetches skip data from WeWantWaste API with intelligent caching
- **Loading States**: Beautiful skeleton loading animations
- **Error Handling**: Graceful error handling with automatic retry and exponential backoff
- **Clean Git History**: Clean commit messages and structured development

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **HeroUI** for modern UI components
- **Tailwind CSS** for styling
- **TanStack Query** (React Query) for data fetching and caching
- **Framer Motion** for animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd REMWaste
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── __tests__/          # Component tests
│   │   ├── ProgressBar.test.tsx
│   │   ├── SelectionSummary.test.tsx
│   │   └── SkipCard.test.tsx
│   ├── ProgressBar.tsx     # Step indicator with icons
│   ├── SelectionSummary.tsx # Bottom fixed selection bar
│   ├── SkipCard.tsx        # Individual skip option card
│   └── SkipGrid.tsx        # Grid layout with loading/error states
├── hooks/                  # Custom React hooks
│   ├── __tests__/          # Hook tests
│   │   └── useUrlState.test.tsx
│   ├── useSkips.ts         # Hook for fetching skip data with React Query
│   ├── useSkipSelection.ts # Hook for managing selection state
│   └── useUrlState.ts      # Hook for URL state synchronization
├── pages/                  # Page components
│   └── SelectSkipPage.tsx  # Main skip selection page
├── services/               # API services
│   └── skipApi.ts          # Skip data API service with React Query
├── test/                   # Testing utilities and setup
│   ├── setup.ts           # Global test configuration and mocks
│   └── utils.tsx          # Custom render utilities with providers
├── types/                  # TypeScript type definitions
│   └── skip.ts            # Skip-related types and interfaces
├── utils/                  # Utility functions
│   ├── constants.ts       # App constants and configuration
│   ├── formatCurrency.ts  # Currency formatting utilities
│   ├── mockData.ts        # Mock data for development and testing
│   └── queryClient.ts     # React Query client configuration
└── App.tsx                 # Main app component
```

## 🎨 Design System

### Colors
- **Primary**: `#FFD400` (Waste yellow)
- **Secondary**: `#2E7D32` (Eco-green)
- **Background**: Dark gradient from slate-900 to slate-800

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear visual hierarchy with consistent sizing

### Spacing
- **Scale**: 8px base spacing scale
- **Responsive**: Adaptive spacing for different screen sizes

## 🔧 API Integration & Data Management

### TanStack Query Features
- **Intelligent Caching**: Data stays fresh for 5 minutes, cached for 10 minutes
- **Automatic Retries**: Exponential backoff with smart retry logic
- **Background Refetching**: Updates data when window regains focus or network reconnects
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Development Tools**: Built-in DevTools for debugging queries

### API Endpoint
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

### Data Structure
```typescript
interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  // ... other properties
}
```

### Query Keys
```typescript
// Organized query keys for cache management
skipQueryKeys = {
  all: ['skips'],
  byLocation: (postcode: string, area: string) => 
    ['skips', 'by-location', { postcode, area }]
}
```

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Labels**: Comprehensive ARIA labeling for screen readers
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: WCAG AA compliant color contrast ratios
- **Semantic HTML**: Proper use of semantic HTML elements

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` (1 column)
- **Tablet**: `640px - 1024px` (2 columns)
- **Desktop**: `> 1024px` (3 columns)

## 🚀 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once
- `yarn test:coverage` - Run tests with coverage report
- `yarn test:ui` - Run tests with interactive UI

## 🧪 Testing

The project includes comprehensive testing with **Vitest** and **React Testing Library**:

### Testing Stack
- **Vitest**: Fast unit test framework with native ES modules support
- **React Testing Library**: User-centric testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **@testing-library/user-event**: Realistic user interaction simulation

### Test Coverage
- **Components**: SkipCard, ProgressBar, SelectionSummary
- **Hooks**: useUrlState, useSkipSelection
- **User Interactions**: Click, keyboard navigation, form submission
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **Responsive Behavior**: Mobile/desktop layout testing

### Testing Philosophy
- **User-centric**: Test what users see and interact with
- **Accessibility-first**: Verify ARIA attributes and keyboard navigation
- **Integration-focused**: Test components with their providers
- **Behavior-driven**: Focus on behavior over implementation details

See [Testing Documentation](./docs/TESTING.md) for detailed testing guidelines and patterns.

## 🔄 Git Workflow

The project follows a clean git workflow with:
- Conventional commit messages
- Feature-based commits
- Clean commit history

### Commit Types
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/updates

## 🎯 Key Features Implemented

### 1. Skip Selection Grid
- Responsive 3-column layout (desktop) / 2-column (tablet) / 1-column (mobile)
- High-quality skip images with lazy loading
- Price display with VAT calculation
- "Not Allowed on Road" warning badges

### 2. Interactive Selection
- Single skip selection with visual feedback
- Hover and focus states with smooth transitions
- Selected state with ring highlight and scale animation

### 3. Progress Indicator
- Multi-step progress bar showing current position
- Visual completion states for previous steps

### 4. Loading & Error States
- Skeleton loading animations during data fetch
- Intelligent error handling with automatic retry and exponential backoff
- Background refetching with stale-while-revalidate pattern
- Empty state handling
- React Query DevTools integration for debugging

### 5. Continue Button
- Disabled state until skip is selected
- Clear visual feedback for selection state
- Accessible button with proper ARIA labels

## 🌟 UI/UX Highlights

- **Dark Theme**: Modern dark background with bright accent colors
- **Smooth Animations**: 200ms transitions for all interactive elements
- **Visual Hierarchy**: Clear typography and spacing hierarchy
- **Professional Polish**: Attention to micro-interactions and details

## 🚀 React Query Benefits

### Performance Optimizations
- **Data Caching**: Reduces API calls and improves load times
- **Background Updates**: Fresh data without blocking UI
- **Deduplication**: Multiple components requesting same data share single request
- **Optimistic Updates**: Instant feedback for better perceived performance

### Developer Experience
- **DevTools Integration**: Inspect queries, mutations, and cache in real-time
- **Automatic Error Boundaries**: Graceful error handling with retry logic
- **TypeScript Support**: Fully typed queries and mutations
- **Centralized Configuration**: Single source of truth for all data fetching

### User Experience
- **Offline Support**: Cached data available when offline
- **Smart Retries**: Automatic retry with exponential backoff
- **Loading States**: Granular loading states for better UX
- **Stale While Revalidate**: Show cached data while fetching fresh data

## 🏗️ Architecture & Scalability

### Why This Setup for a "Simple" Page?

While this might seem like over-engineering for a single skip selection page, **every architectural decision has been made with scalability and future extensibility in mind**. As experienced developers, we understand that:

> *"What starts as a simple page today becomes a complex application tomorrow."*

### 🎯 Future-Proofing Justifications

#### 1. **TanStack Query Foundation**
```typescript
// Today: Single skip endpoint
const { data: skips } = useQuery({
  queryKey: skipQueryKeys.byLocation(postcode, area),
  queryFn: () => fetchSkips({ postcode, area })
});

// Tomorrow: Multiple related endpoints
const { data: user } = useQuery({ queryKey: ['user', userId], ... });
const { data: bookings } = useQuery({ queryKey: ['bookings', userId], ... });
const { data: payments } = useQuery({ queryKey: ['payments'], ... });
// All sharing the same caching, retry, and sync logic!
```

**Scalability Benefits:**
- **Multi-Page Application**: When we add permit checking, date selection, payment pages
- **Related Data**: User profiles, booking history, payment methods
- **Real-time Updates**: Live booking status, price changes, availability updates
- **Offline-First**: Critical for mobile users in areas with poor connectivity

#### 2. **Component Architecture**
```
Current: Single page
Future: Multi-step wizard
├── PostcodeEntry/
├── WasteTypeSelection/
├── SkipSelection/          ← We're here
├── PermitCheck/
├── DateSelection/
├── AddressConfirmation/
├── PaymentProcessing/
└── BookingConfirmation/
```

**Extensibility Benefits:**
- **Reusable Components**: SkipCard can be used in comparison views, favorites, recommendations
- **Consistent UI**: Design system scales across 20+ pages
- **A11y Standards**: Accessibility patterns established for entire application

#### 3. **Service Layer Architecture**
```typescript
// Current API service
src/services/
├── skipApi.ts              ← Current

// Future service expansion
src/services/
├── skipApi.ts
├── userApi.ts              ← User authentication, profiles
├── bookingApi.ts           ← Booking management, history
├── paymentApi.ts           ← Stripe/PayPal integration
├── locationApi.ts          ← Postcode validation, geocoding
├── notificationApi.ts      ← Email/SMS notifications
└── analyticsApi.ts         ← User behavior tracking
```

#### 4. **State Management Scalability**
```typescript
// Today: Simple selection state
const { selectedSkip, selectSkip } = useSkipSelection();

// Tomorrow: Complex booking flow
const { 
  postcode, wasteType, selectedSkip, permitRequired, 
  selectedDate, deliveryAddress, paymentMethod,
  bookingStep, canProceed, validationErrors 
} = useBookingFlow();
```

### 🔮 Future Features This Foundation Enables

#### 1. **Multi-Location Support**
- **Query Key Patterns**: `['skips', 'by-location', { postcode, area }]` easily extends to multiple locations
- **Cache Efficiency**: Skip data cached per location, reducing API calls as users explore different areas
- **Background Sync**: Prices update automatically when user switches locations

#### 2. **Real-Time Features**
```typescript
// Future: WebSocket integration
const { data: liveAvailability } = useQuery({
  queryKey: ['skips', 'availability', date],
  queryFn: fetchLiveAvailability,
  refetchInterval: 30000, // Already configured!
});
```

#### 3. **Advanced Filtering & Search**
```typescript
// Current query structure easily extends
const { data: skips } = useQuery({
  queryKey: skipQueryKeys.byLocation(postcode, area),
  // Future: Add filters
  queryKey: ['skips', 'by-location', { 
    postcode, area, 
    priceRange, sizes, roadAllowed, availableFrom 
  }],
});
```

#### 4. **Offline-First Mobile App**
- **Service Worker Ready**: React Query's cache works seamlessly with service workers
- **Optimistic Updates**: Book skips offline, sync when online
- **Background Sync**: Queue booking requests when offline

#### 5. **Multi-Tenant Platform**
```typescript
// Easy extension for different waste companies
const { data: skips } = useQuery({
  queryKey: ['skips', 'by-location', { postcode, area, company: 'wewantwaste' }],
  queryFn: () => fetchSkips({ postcode, area, company })
});
```

### 🛠️ Technology Choice Justifications

#### **React Query vs. Simple fetch()**
| Simple Approach | React Query Foundation |
|-----------------|----------------------|
| ❌ Manual cache management | ✅ Automatic intelligent caching |
| ❌ No retry logic | ✅ Smart retry with exponential backoff |
| ❌ Loading states per component | ✅ Centralized loading management |
| ❌ No offline support | ✅ Built-in offline capabilities |
| ❌ Manual error handling | ✅ Error boundaries and recovery |
| ❌ Data synchronization issues | ✅ Background sync and invalidation |

#### **TypeScript Foundation**
- **API Evolution**: As APIs add fields, TypeScript catches breaking changes
- **Team Scalability**: New developers understand data flow immediately
- **Refactoring Safety**: Rename API fields across entire codebase with confidence

#### **Component Modularity**
- **A/B Testing**: Swap out SkipCard designs without touching business logic
- **Feature Flags**: Enable/disable features per user segment
- **White-Label Solutions**: Different UIs for different waste companies

### 📋 Architecture Documentation
For detailed technical decisions and rationale, see our [Architecture Decision Records (ADR)](./docs/ADR.md).

## 📄 License

This project is built for demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Follow the commit message conventions
5. Submit a pull request

---

Built with ❤️ using React, TypeScript, HeroUI, and Tailwind CSS
