import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { SkipCard } from '../SkipCard';
import type { Skip } from '../../types/skip';

const mockSkip: Skip = {
  id: 1,
  size: 6,
  price_before_vat: 150,
  vat: 20,
  hire_period_days: 7,
  allowed_on_road: true,
};

const mockSkipNotAllowedOnRoad: Skip = {
  id: 2,
  size: 8,
  price_before_vat: 180,
  vat: 20,
  hire_period_days: 14,
  allowed_on_road: false,
};

describe('SkipCard', () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders skip information correctly', () => {
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('6 Yard Skip')).toBeInTheDocument();
    expect(screen.getByText('£180')).toBeInTheDocument(); // 150 * 1.2 = 180
    expect(screen.getByText('inc. VAT')).toBeInTheDocument();
    expect(screen.getByText('7 day hire period')).toBeInTheDocument();
    expect(screen.getByText('6 Yards')).toBeInTheDocument();
  });

  it('shows warning chip for skips not allowed on road', () => {
    render(
      <SkipCard
        skip={mockSkipNotAllowedOnRoad}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Not Allowed On The Road')).toBeInTheDocument();
  });

  it('does not show warning chip for skips allowed on road', () => {
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.queryByText('Not Allowed On The Road')).not.toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const card = screen.getByRole('button', { name: /6 yard skip for £180/i });
    await user.click(card);

    expect(mockOnSelect).toHaveBeenCalledWith(mockSkip);
  });

  it('calls onSelect when button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole('button', { name: 'Select This Skip' });
    await user.click(button);

    expect(mockOnSelect).toHaveBeenCalledWith(mockSkip);
  });

  it('handles keyboard navigation with Enter key', async () => {
    const user = userEvent.setup();
    
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const card = screen.getByRole('button', { name: /6 yard skip for £180/i });
    card.focus();
    await user.keyboard('{Enter}');

    expect(mockOnSelect).toHaveBeenCalledWith(mockSkip);
  });

  it('handles keyboard navigation with Space key', async () => {
    const user = userEvent.setup();
    
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const card = screen.getByRole('button', { name: /6 yard skip for £180/i });
    card.focus();
    await user.keyboard(' ');

    expect(mockOnSelect).toHaveBeenCalledWith(mockSkip);
  });

  it('shows selected state correctly', () => {
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={true}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Selected ✓')).toBeInTheDocument();
    expect(screen.queryByText('Select This Skip')).not.toBeInTheDocument();
  });

  it('shows unselected state correctly', () => {
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Select This Skip')).toBeInTheDocument();
    expect(screen.queryByText('Selected ✓')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const card = screen.getByRole('button', { name: /6 yard skip for £180/i });
    expect(card).toHaveAttribute('aria-selected', 'false');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('has proper accessibility attributes when selected', () => {
    render(
      <SkipCard
        skip={mockSkip}
        isSelected={true}
        onSelect={mockOnSelect}
      />
    );

    const card = screen.getByRole('button', { name: /6 yard skip for £180/i });
    expect(card).toHaveAttribute('aria-selected', 'true');
  });
}); 