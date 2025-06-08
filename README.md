# REMWaste - Skip Selection App

A modern, pixel-perfect React application for selecting waste skip sizes with a beautiful UI built using HeroUI and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Built with HeroUI components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and ARIA support
- **TypeScript**: Fully typed for better development experience
- **Real-time Data**: Fetches skip data from WeWantWaste API
- **Loading States**: Beautiful skeleton loading animations
- **Error Handling**: Graceful error handling with retry functionality
- **Professional Git History**: Clean commit messages and structured development

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **HeroUI** for modern UI components
- **Tailwind CSS** for styling
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
├── components/          # Reusable UI components
│   ├── ProgressBar.tsx  # Step indicator component
│   ├── SkipCard.tsx     # Individual skip option card
│   └── SkipGrid.tsx     # Grid layout with loading/error states
├── hooks/               # Custom React hooks
│   └── useSkips.ts      # Hook for fetching skip data
├── pages/               # Page components
│   └── SelectSkipPage.tsx # Main skip selection page
├── types/               # TypeScript type definitions
│   └── skip.ts          # Skip-related types
├── utils/               # Utility functions
│   ├── constants.ts     # App constants and configuration
│   └── formatCurrency.ts # Currency formatting utilities
└── App.tsx              # Main app component
```

## 🎨 Design System

### Colors
- **Primary**: `#FFD400` (WeWantWaste yellow)
- **Secondary**: `#2E7D32` (Eco-green)
- **Background**: Dark gradient from slate-900 to slate-800

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear visual hierarchy with consistent sizing

### Spacing
- **Scale**: 8px base spacing scale
- **Responsive**: Adaptive spacing for different screen sizes

## 🔧 API Integration

The app fetches skip data from:
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

## 🔄 Git Workflow

The project follows a professional git workflow with:
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
- Error handling with retry functionality
- Empty state handling

### 5. Continue Button
- Disabled state until skip is selected
- Clear visual feedback for selection state
- Accessible button with proper ARIA labels

## 🌟 UI/UX Highlights

- **Dark Theme**: Modern dark background with bright accent colors
- **Smooth Animations**: 200ms transitions for all interactive elements
- **Visual Hierarchy**: Clear typography and spacing hierarchy
- **Professional Polish**: Attention to micro-interactions and details

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
