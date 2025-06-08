import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test case (React Testing Library)
afterEach(() => {
  cleanup();
});

// Extend Vitest's expect with custom matchers from jest-dom
expect.extend({});

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
} as any;

// Mock ResizeObserver  
globalThis.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
globalThis.scrollTo = vi.fn(); 