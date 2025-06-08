import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { SelectionSummary } from '../SelectionSummary';
import type { Skip } from '../../types/skip';

const mockSkip: Skip = {
  id: 1,
  size: 6,
  price_before_vat: 150,
  vat: 20,
  hire_period_days: 7,
  allowed_on_road: true,
};

describe('SelectionSummary', () => {
  const mockOnBack = vi.fn();
  const mockOnContinue = vi.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    mockOnContinue.mockClear();
  });

  it('does not render when no skip is selected', () => {
    render(
      <SelectionSummary
        selectedSkip={null}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    // Should not render the fixed bottom bar
    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('renders skip details when skip is selected', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    expect(screen.getAllByText('6 Yard Skip')[0]).toBeInTheDocument();
    expect(screen.getAllByText('£180')[0]).toBeInTheDocument(); // 150 * 1.2 = 180
    expect(screen.getAllByText('inc. VAT')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/7 day hire/)[0]).toBeInTheDocument();
  });

  it('shows disclaimer text', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    expect(screen.getByText(/Imagery and information shown throughout this website/)).toBeInTheDocument();
    expect(screen.getByText(/colours may vary/)).toBeInTheDocument();
  });

  it('calls onContinue when continue button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    const continueButtons = screen.getAllByRole('button', { name: /continue/i });
    await user.click(continueButtons[0]); // Click first continue button

    expect(mockOnContinue).toHaveBeenCalledTimes(1);
  });

  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    const backButtons = screen.getAllByRole('button', { name: /back/i });
    await user.click(backButtons[0]); // Click first back button

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('does not render back button when onBack is not provided', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onContinue={mockOnContinue}
      />
    );

    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    const continueButtons = screen.getAllByRole('button', { name: /continue/i });
    expect(continueButtons[0]).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
        isLoading={true}
      />
    );

    const continueButtons = screen.getAllByRole('button', { name: /processing/i });
    expect(continueButtons[0]).toBeDisabled();
  });

  it('disables continue button when loading', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
        isLoading={true}
      />
    );

    const continueButtons = screen.getAllByRole('button', { name: /processing/i });
    expect(continueButtons[0]).toBeDisabled();
  });

  it('enables continue button when not loading', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
        isLoading={false}
      />
    );

    const continueButtons = screen.getAllByRole('button', { name: /continue/i });
    expect(continueButtons[0]).not.toBeDisabled();
  });

  it('renders mobile and desktop layouts', () => {
    render(
      <SelectionSummary
        selectedSkip={mockSkip}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    // Both layouts should be present (one hidden on mobile, one on desktop)
    const skipTitles = screen.getAllByText('6 Yard Skip');
    expect(skipTitles.length).toBeGreaterThanOrEqual(1);
  });

  it('calculates price correctly with VAT', () => {
    const skipWithDifferentVAT: Skip = {
      id: 2,
      size: 8,
      price_before_vat: 100,
      vat: 25, // 25% VAT
      hire_period_days: 14,
      allowed_on_road: false,
    };

    render(
      <SelectionSummary
        selectedSkip={skipWithDifferentVAT}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    const priceElements = screen.getAllByText('£125');
    expect(priceElements[0]).toBeInTheDocument(); // 100 * 1.25 = 125
  });

  it('shows correct hire period text variations', () => {
    const skipWithLongerPeriod: Skip = {
      ...mockSkip,
      hire_period_days: 14,
    };

    render(
      <SelectionSummary
        selectedSkip={skipWithLongerPeriod}
        onBack={mockOnBack}
        onContinue={mockOnContinue}
      />
    );

    const hirePeriodElements = screen.getAllByText(/14 day hire/);
    expect(hirePeriodElements[0]).toBeInTheDocument();
  });
}); 