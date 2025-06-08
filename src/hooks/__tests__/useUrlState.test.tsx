import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUrlState } from '../useUrlState';

// Mock window.location and history
const mockLocation = {
  pathname: '/test',
  search: '',
  origin: 'http://localhost:3000',
};

const mockHistory = {
  replaceState: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true,
});

describe('useUrlState', () => {
  beforeEach(() => {
    mockLocation.search = '';
    mockHistory.replaceState.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default state when no URL params', () => {
    const { result } = renderHook(() => useUrlState());

    expect(result.current.urlState).toEqual({
      step: 'select-skip',
      selectedSkipId: null,
      postcode: 'NR32',
      area: 'Lowestoft',
    });
  });

  it('reads state from URL parameters on mount', () => {
    mockLocation.search = '?step=payment&skipId=123&postcode=B1&area=Birmingham';
    
    const { result } = renderHook(() => useUrlState());

    expect(result.current.urlState).toEqual({
      step: 'payment',
      selectedSkipId: '123',
      postcode: 'B1',
      area: 'Birmingham',
    });
  });

  it('updates URL when state changes', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateUrlState({
        step: 'choose-date',
        selectedSkipId: '456',
      });
    });

    expect(mockHistory.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test?step=choose-date&skipId=456&postcode=NR32&area=Lowestoft'
    );
  });

  it('handles partial state updates', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateUrlState({
        selectedSkipId: '789',
      });
    });

    expect(result.current.urlState.selectedSkipId).toBe('789');
    expect(result.current.urlState.step).toBe('select-skip'); // unchanged
    expect(result.current.urlState.postcode).toBe('NR32'); // unchanged
  });

  it('omits skipId from URL when null', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateUrlState({
        selectedSkipId: null,
        step: 'permit-check',
      });
    });

    expect(mockHistory.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/test?step=permit-check&postcode=NR32&area=Lowestoft'
    );
  });

  it('generates shareable URL correctly', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateUrlState({
        step: 'payment',
        selectedSkipId: '123',
        postcode: 'M1',
        area: 'Manchester',
      });
    });

    const shareableUrl = result.current.getShareableUrl();
    expect(shareableUrl).toBe('http://localhost:3000/test?step=payment&skipId=123&postcode=M1&area=Manchester');
  });

  it('generates shareable URL without skipId when null', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateUrlState({
        step: 'select-skip',
        selectedSkipId: null,
      });
    });

    const shareableUrl = result.current.getShareableUrl();
    expect(shareableUrl).toBe('http://localhost:3000/test?step=select-skip&postcode=NR32&area=Lowestoft');
  });

  it('handles URL parameters with special characters', () => {
    mockLocation.search = '?postcode=SW1A+1AA&area=London+Westminster';
    
    const { result } = renderHook(() => useUrlState());

    expect(result.current.urlState.postcode).toBe('SW1A 1AA');
    expect(result.current.urlState.area).toBe('London Westminster');
  });

  it('uses default values for missing URL parameters', () => {
    mockLocation.search = '?step=payment'; // missing other params
    
    const { result } = renderHook(() => useUrlState());

    expect(result.current.urlState).toEqual({
      step: 'payment',
      selectedSkipId: null,
      postcode: 'NR32', // default
      area: 'Lowestoft', // default
    });
  });

  it('handles empty URL search string', () => {
    mockLocation.search = '';
    
    const { result } = renderHook(() => useUrlState());

    expect(result.current.urlState).toEqual({
      step: 'select-skip',
      selectedSkipId: null,
      postcode: 'NR32',
      area: 'Lowestoft',
    });
  });

  it('updates state correctly with multiple calls', () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.updateUrlState({ step: 'waste-type' });
    });

    act(() => {
      result.current.updateUrlState({ selectedSkipId: '999' });
    });

    expect(result.current.urlState).toEqual({
      step: 'waste-type',
      selectedSkipId: '999',
      postcode: 'NR32',
      area: 'Lowestoft',
    });

    expect(mockHistory.replaceState).toHaveBeenCalledTimes(2);
  });
}); 