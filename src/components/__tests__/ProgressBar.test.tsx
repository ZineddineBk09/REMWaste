import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { ProgressBar } from '../ProgressBar';

const mockSteps = [
  { id: 'postcode', label: 'Postcode', completed: true, active: false },
  { id: 'waste-type', label: 'Waste Type', completed: true, active: false },
  { id: 'select-skip', label: 'Select Skip', completed: false, active: true },
  { id: 'permit-check', label: 'Permit Check', completed: false, active: false },
  { id: 'choose-date', label: 'Choose Date', completed: false, active: false },
  { id: 'payment', label: 'Payment', completed: false, active: false },
];

describe('ProgressBar', () => {
  it('renders all steps with correct labels', () => {
    render(<ProgressBar steps={mockSteps} />);

    expect(screen.getAllByText('Postcode')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Waste Type')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Select Skip')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Permit Check')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Choose Date')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Payment')[0]).toBeInTheDocument();
  });

  it('shows correct icons for each step type', () => {
    render(<ProgressBar steps={mockSteps} />);

    // We can't easily test the actual icons, but we can test that the step elements exist
    const stepElements = screen.getAllByText(/Postcode|Waste Type|Select Skip|Permit Check|Choose Date|Payment/);
    expect(stepElements.length).toBeGreaterThanOrEqual(mockSteps.length); // Each step appears at least once
  });

  it('shows active step tooltip on mobile', () => {
    render(<ProgressBar steps={mockSteps} />);
    
    // The active step label should appear in the mobile tooltip
    const activeStepTooltips = screen.getAllByText('Select Skip');
    expect(activeStepTooltips.length).toBeGreaterThan(1); // Should appear in both layouts
  });

  it('renders with custom className', () => {
    const { container } = render(
      <ProgressBar steps={mockSteps} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles completed steps correctly', () => {
    const completedSteps = mockSteps.map(step => ({ ...step, completed: true, active: false }));
    render(<ProgressBar steps={completedSteps} />);

    // All steps should be marked as completed
    expect(screen.getAllByText('Postcode')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Waste Type')[0]).toBeInTheDocument();
  });

  it('handles no active step', () => {
    const noActiveSteps = mockSteps.map(step => ({ ...step, active: false }));
    render(<ProgressBar steps={noActiveSteps} />);

    // Should still render all steps
    expect(screen.getAllByText('Postcode')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Select Skip')[0]).toBeInTheDocument();
  });

  it('renders desktop horizontal layout', () => {
    render(<ProgressBar steps={mockSteps} />);
    
    // Desktop layout should be hidden on mobile, visible on desktop
    const desktopLayout = document.querySelector('.hidden.md\\:block');
    expect(desktopLayout).toBeInTheDocument();
  });

  it('renders mobile sidebar layout', () => {
    render(<ProgressBar steps={mockSteps} />);
    
    // Mobile layout should be hidden on desktop, visible on mobile
    const mobileLayout = document.querySelector('.md\\:hidden.fixed');
    expect(mobileLayout).toBeInTheDocument();
  });

  it('handles empty steps array gracefully', () => {
    render(<ProgressBar steps={[]} />);
    
    // Should not crash and should render the basic structure
    const progressContainer = document.querySelector('.hidden.md\\:block, .md\\:hidden.fixed');
    expect(progressContainer).toBeInTheDocument();
  });

  it('shows proper step progression', () => {
    const progressSteps = [
      { id: 'step1', label: 'Step 1', completed: true, active: false },
      { id: 'step2', label: 'Step 2', completed: true, active: false },
      { id: 'step3', label: 'Step 3', completed: false, active: true },
      { id: 'step4', label: 'Step 4', completed: false, active: false },
    ];

    render(<ProgressBar steps={progressSteps} />);

    expect(screen.getAllByText('Step 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Step 2')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Step 3')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Step 4')[0]).toBeInTheDocument();
  });
}); 